from fastapi import APIRouter, Response, BackgroundTasks

import controller.auth as auth
from model.database import SessionDep
from schemas.login_schema import LoginRequestModel, LoginResponseModel
from services.session import create_new_session, delete_expired_session

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/login")
async def auth_login(data: LoginRequestModel, response: Response, session: SessionDep,
                     background_task: BackgroundTasks) -> dict[str, LoginResponseModel | str]:
    
    user_in_db = auth.initiate_login(data.email, data.password, session)

    role = "seller" if user_in_db.is_seller else "customer"
    new_session = create_new_session(session, user_in_db.email, role)
    
    # As a response send session_id back to client, which will be saved as cookie.
    # And later be used to verify user
    response.set_cookie(key="session_id",
                        value=str(new_session.id),
                        httponly=True,
                        secure=True,
                        samesite="lax",
                        max_age=60 * 60 * 24)
    
    # Add deletion of expired session as a background task
    background_task.add_task(delete_expired_session)

    return {"user": user_in_db, "message": "Login successful"}


@router.post("/register")
async def auth_register():
    return auth.register_new_user()


@router.post("/logout")
async def auth_logout():
    return auth.initiate_logout()
