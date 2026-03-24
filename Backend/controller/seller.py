from fastapi import HTTPException
from sqlmodel import select

from model.database import SessionDep
from model.product_model import ProductsModel
from model.session_model import SessionModel
from model.user_model import UserModel


def fetch_seller_profile():
    return {"message": "return seller information"}


async def fetch_seller_products(db_session: SessionDep, user_session: SessionModel):
    result = await db_session.exec(select(ProductsModel)
                                   .join(UserModel)
                                   .where(UserModel.email == user_session.email))
    products_in_db = result.all()
    if not products_in_db:
        raise HTTPException(status_code=404, detail="No product found. Please add a product.")

    return products_in_db
