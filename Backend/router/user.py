from fastapi import APIRouter

import controller.seller as seller
import controller.user as user
from model.database import SessionDep
from schemas.user_session_schema import UserSessionResponseModel
from services.session import valid_session_dep

router = APIRouter(
    prefix="/user",
    tags=["users"]
)


@router.get("/")
async def get_user(db_session: SessionDep, user_session: valid_session_dep) -> dict[
    str, UserSessionResponseModel | str]:
    """Retrieve current user information based on active session data

    :param db_session: current active database session
    :param user_session: current active user session

    :return: On successful verification of session_id, return user data as per database
    """
    if not user_session:
        return {"message": "No active session found. Please login."}

    user_in_db = await user.fetch_user_profile(db_session, user_session)

    return {"user": user_in_db, "message": "User found successfully"}


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
