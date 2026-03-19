import uuid
from sqlmodel import SQLModel, Field, TEXT
from pydantic import EmailStr


class CustomerModel(SQLModel, table=True):
    __tablename__ = "customers_details"  # type: ignore

    id: uuid.UUID = Field(default_factory=uuid.uuid4,
                          nullable=False, primary_key=True, index=True, unique=True)

    name: str = Field(max_length=60, nullable=False)

    phone: str = Field(max_length=20, nullable=False)

    address: str = Field(max_length=255, nullable=False)

    email: EmailStr = Field(sa_type=TEXT, max_length=255,
                            index=True, nullable=False, unique=True)

    password: str = Field(nullable=False)

    is_seller: bool = Field(default=False, nullable=False)
