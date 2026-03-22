from fastapi import HTTPException
from sqlmodel import select

from model.database import SessionDep
from model.user_model import UserModel
from services.hasher import verify_password
from schemas.login_schema import LoginResponseModel


def initiate_login(email: str, password: str, session: SessionDep) -> LoginResponseModel:
    invalid_error = HTTPException(status_code=404, detail="Incorrect Email or Password. Please try again.")

    user_in_db = session.exec(select(UserModel).where(UserModel.email == email)).first()
    if not user_in_db:
        raise invalid_error
    print(user_in_db.password)
    verified_hash = verify_password(user_in_db.password, password)
    if not verified_hash:
        raise invalid_error

    return LoginResponseModel(**user_in_db.model_dump())


def initiate_logout():
    return {"message": "Logout successful"}


def register_new_user():
    return {"message": "user saved into database"}
