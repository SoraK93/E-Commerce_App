from fastapi import APIRouter
from model.database import SessionDep
from model.auth_model import LoginModel

import controller.auth as auth

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/login")
async def auth_login(data: LoginModel, session: SessionDep):
    return auth.initiate_login(data.email, data.password, session)


@router.post("/register")
async def auth_register():
    return auth.register_new_user()


@router.post("/logout")
async def auth_logout():
    return auth.initiate_logout()
