from fastapi import HTTPException

from model.user_model import UserModel
from model.database import SessionDep
from sqlmodel import select


def initiate_login(email: str, password: str, session: SessionDep):
    user_in_db = session.exec(select(UserModel).where(UserModel.email == email)).first()
    if not user_in_db:
        raise HTTPException(status_code=404, detail="Incorrect Email or Password. Please try again.")
    # TODO: create password hashing. currently using simple implementation
    if user_in_db.password != password:
        raise HTTPException(status_code=401, detail="Incorrect Email or Password. Please try again.")

    return {"message": "Login process starts"}


def initiate_logout():
    return {"message": "Logout successful"}


def register_new_user():
    return {"message": "user saved into database"}
