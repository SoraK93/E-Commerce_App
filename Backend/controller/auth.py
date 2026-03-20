from model.database import SessionDep


def initiate_login(email: str, password: str, session: SessionDep):
    print(email, password)
    return {"message": "Login process starts"}


def initiate_logout():
    return {"message": "Logout successful"}


def register_new_user():
    return {"message": "user saved into database"}
