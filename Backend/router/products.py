from fastapi import APIRouter

import Backend.controller.products as products

router = APIRouter(
    prefix="/products",
    tags=["products"]
)


@router.get("/")
async def get_products():
    return products.fetch_all_product()


@router.get("/{product_id}")
async def get_product_by_id():
    return products.fetch_product_by_id()


@router.post("/")
async def create_new_product():
    return products.make_a_new_product()


@router.patch("/{product_id}")
async def update_product_by_id():
    return products.edit_existing_product_detail()


@router.delete("/{product_id}")
async def delete_product_by_id():
    return products.delete_existing_product()
