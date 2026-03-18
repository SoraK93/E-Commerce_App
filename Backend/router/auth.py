from fastapi import APIRouter

import Backend.controller.auth as auth

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/login")
async def auth_login():
    return auth.initiate_login()


@router.post("/register")
async def auth_register():
    return auth.register_new_user()


@router.post("/logout")
async def auth_logout():
    return auth.initiate_logout()
