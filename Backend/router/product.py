from uuid import UUID

from fastapi import APIRouter

import controller.product as product
from model.database import SessionDep
from services.session import valid_session_dep

router = APIRouter(
    prefix="/product",
    tags=["product"]
)


@router.get("/")
async def get_products(db_session: SessionDep):
    """Retrieve all products

    :param db_session: current active database session

    :return: On success, returns a list containing product information
    """
    return await product.fetch_all_product(db_session)


@router.get("/{product_id}")
async def get_product_by_id(product_id: UUID, db_session: SessionDep):
    product_in_db = await product.fetch_product_by_id(product_id, db_session)
    return [product_in_db]


@router.post("/")
async def create_new_product(user_session: valid_session_dep, db_session: SessionDep):
    return product.make_a_new_product(user_session, db_session)


@router.patch("/{product_id}")
async def update_product_by_id():
    return product.edit_existing_product_detail()


@router.delete("/{product_id}")
async def delete_product_by_id():
    return product.delete_existing_product()
