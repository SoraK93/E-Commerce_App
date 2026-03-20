from model.session_model import SessionModel, user_role
from model.database import SessionDep
from pydantic import EmailStr
from sqlmodel import delete, func


def serialize(session: SessionDep, email: EmailStr, role: user_role = "customer"):
    """Creates user session and stores it inside database

    @param session: current active database session
    @param email: user email received during login request
    @param role: set user role ["admin", "seller", "customer"]

    @return session"""
    new_session = SessionModel(role=role, email=email)

    session.add(new_session)
    session.commit()
    session.refresh(new_session)

    return new_session


def delete_expired_session(session: SessionDep):
    """ Handle deletion of expired session in database

    @param session: current active database session"""
    del_session = delete(SessionModel).where(SessionModel.expire_at < func.now())
    session.exec(del_session)
    session.commit()