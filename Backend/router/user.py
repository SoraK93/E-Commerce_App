from fastapi import APIRouter

import controller.user as user
import controller.seller as seller

router = APIRouter(
    prefix="/user",
    tags=["users"]
)


@router.get("/")
async def get_user():
    return user.fetch_user_profile()


@router.get("/email")
async def get_user_email():
    return user.fetch_user_email()


@router.patch("/update")
async def update_user_by_id():
    return user.update_user_profile()


@router.patch("/change-password")
async def change_user_password():
    return user.update_user_password()


@router.delete("/delete")
async def delete_user_by_id():
    return user.delete_user_profile()


@router.get("/seller-profile")
async def get_seller_by_id():
    return seller.fetch_seller_profile()


@router.get("/view-product")
async def get_product_by_seller_id():
    return seller.fetch_seller_products()
