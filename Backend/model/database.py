import os
from dotenv import load_dotenv
from fastapi import Depends
from sqlmodel import create_engine, Session
from typing import Annotated, Generator

load_dotenv()

DATABASE_URL = os.environ["DB_URL"]

engine = create_engine(url=DATABASE_URL,
                       echo=True,
                       pool_pre_ping=True)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
