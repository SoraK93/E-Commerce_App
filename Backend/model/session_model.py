import uuid
from datetime import datetime, timedelta, timezone
from typing import Literal

from pydantic import EmailStr
from sqlalchemy import Column, DateTime
from sqlmodel import SQLModel, Field, TEXT

user_role = Literal["admin", "seller", "customer"]


class SessionModel(SQLModel, table=True):
    __tablename__ = "active_session"

    id: uuid.UUID = Field(default_factory=uuid.uuid4,
                          index=True, primary_key=True)

    role: user_role = Field(sa_type=TEXT, default="customer", nullable=False)

    email: EmailStr = Field(sa_type=TEXT, nullable=False)

    expire_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc) + timedelta(hours=24),
                                sa_column=Column(DateTime(timezone=True),
                                                 index=True))
