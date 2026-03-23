from fastapi import HTTPException
from sqlmodel import select

from model.database import SessionDep
from model.session_model import SessionModel
from model.user_model import UserModel
from schemas.user_session_schema import UserSessionResponseModel


async def fetch_user_profile(db_session: SessionDep, user_session: SessionModel) -> UserSessionResponseModel:
    """ Retrieve user data from database

    :param db_session: current active database session
    :param user_session: current active user session

    :return: Returns user data as per database
    """
    result = await db_session.exec(select(UserModel).where(UserModel.email == user_session.email))
    user_in_db = result.first()
    
    if not user_in_db:
        raise HTTPException(status_code=404, detail="User not found.")
    
    return UserSessionResponseModel(**user_in_db.model_dump())


def fetch_user_email():
    return {"message": "return user email"}


def update_user_profile():
    return {"message": "update user information"}


def update_user_password():
    return {"message": "update user password"}


def delete_user_profile():
    return {"message": "delete user information"}
