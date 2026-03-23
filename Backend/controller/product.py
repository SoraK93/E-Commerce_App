from fastapi import HTTPException
from sqlmodel import select

from model import SessionModel
from model.database import SessionDep
from model.product_model import ProductsModel


async def fetch_all_product(db_session: SessionDep):
    """Retrieve all products from database

    :param db_session: current active database session

    :return: Returns a list containing all products
    """
    result = await db_session.exec(select(ProductsModel))
    all_product = result.all()

    if not len(all_product):
        raise HTTPException(status_code=404, detail="No product found")

    return all_product


def fetch_product_by_id():
    return {"message": "Should return a specific product"}


def make_a_new_product(user: SessionModel, db_session: SessionDep):
    return {"message": "Should create a new product"}


def edit_existing_product_detail():
    return {"message": "should update a single product"}


def delete_existing_product():
    return {"message": "should delete a specific product"}
