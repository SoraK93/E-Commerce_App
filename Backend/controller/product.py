from model.database import engine
from model.product_model import ProductsModel

from sqlmodel import Session, select

def fetch_all_product():
    with Session(engine) as session:
        result = session.exec(select(ProductsModel)).all()

    return result


def fetch_product_by_id():
    return {"message": "Should return a specific product"}


def make_a_new_product():
    return {"message": "Should create a new product"}


def edit_existing_product_detail():
    return {"message": "should update a single product"}


def delete_existing_product():
    return {"message": "should delete a specific product"}