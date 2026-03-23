from fastapi import APIRouter, Response, BackgroundTasks

import controller.auth as auth
from model.database import SessionDep
from schemas.login_schema import LoginRequestModel, LoginResponseModel
from schemas.registration_schema import RegistrationRequestModel
from services.session import create_new_session, delete_expired_session, valid_session_dep

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/login")
async def auth_login(login_data: LoginRequestModel, response: Response, db_session: SessionDep,
                     background_task: BackgroundTasks) -> dict[str, LoginResponseModel | str]:
    """Initiate user login process and send session_id to manage the active session

    :param login_data: user login data received as per request.body
    :param response: send a response cookie with attached session_id
    :param db_session: current active database session
    :param background_task: used to perform a database specific task

    :return: On successful login, returns user data found in database
    """
    user_in_db = await auth.initiate_login(login_data, db_session)

    role = "seller" if user_in_db.is_seller else "customer"
    new_session = await create_new_session(db_session, user_in_db.email, role)

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
async def auth_register(registration_data: RegistrationRequestModel, db_session: SessionDep) -> dict[
    str, str]:
    """Initiate new user registration process

    :param registration_data: user registration information received as per request.body
    :param db_session: current active database session

    :return: on successful registration returns a success message
    """
    await auth.register_new_user(registration_data, db_session)
    return {"message": "Registered Successfully"}


@router.post("/logout")
async def auth_logout(response: Response, db_session: SessionDep, user_session: valid_session_dep) -> dict[str, str]:
    """Initiate logout process, deleting session data stored in database and sending a response to delete cookie stored in client

    :param response: used to send a delete cookie response with key = "session_id"
    :param db_session: current active database session
    :param user_session: current active user session as per request.cookie

    :return: On successful logout return a success message
    """
    try:
        await db_session.delete(user_session)
        await db_session.commit()
    except Exception:
        await db_session.rollback()
    finally:
        response.delete_cookie(key="session_id")

    return {"message": "Logged out successfully"}
