from fastapi import APIRouter

import Backend.controller.product as product

router = APIRouter(
    prefix="/product",
    tags=["product"]
)


@router.get("/")
async def get_products():
    return product.fetch_all_product()


@router.get("/{product_id}")
async def get_product_by_id():
    return product.fetch_product_by_id()


@router.post("/")
async def create_new_product():
    return product.make_a_new_product()


@router.patch("/{product_id}")
async def update_product_by_id():
    return product.edit_existing_product_detail()


@router.delete("/{product_id}")
async def delete_product_by_id():
    return product.delete_existing_product()
