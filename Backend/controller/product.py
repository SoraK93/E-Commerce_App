from uuid import UUID

from fastapi import HTTPException
from sqlalchemy.orm import selectinload
from sqlmodel import select

from model.session_model import SessionModel
from model.database import SessionDep
from model.product_model import ProductsModel
from schemas.product_schema import ProductResponseModel


async def fetch_all_product(db_session: SessionDep):
    """Retrieve all products from database

    :param db_session: current active database session

    :return: Returns a list containing all products
    """
    result = await db_session.exec(select(ProductsModel)
                                   .options(selectinload(ProductsModel.seller)))
    all_product = result.all()

    if not len(all_product):
        raise HTTPException(status_code=404, detail="No product found")

    return [ProductResponseModel.model_validate(product) for product in all_product]


async def fetch_product_by_id(product_id: UUID, db_session: SessionDep) -> ProductResponseModel:
    result = await db_session.exec(select(ProductsModel)
                                   .where(ProductsModel.id == product_id)
                                   .options(selectinload(ProductsModel.seller)))
    product_in_db = result.first()

    if not product_in_db:
        raise HTTPException(status_code=404, detail="Product not found")

    return ProductResponseModel.model_validate(product_in_db)


def make_a_new_product(user: SessionModel, db_session: SessionDep):
    return {"message": "Should create a new product"}


def edit_existing_product_detail():
    return {"message": "should update a single product"}


def delete_existing_product():
    return {"message": "should delete a specific product"}
