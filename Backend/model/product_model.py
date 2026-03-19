import uuid
from datetime import datetime
from decimal import Decimal
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, DateTime, func


class ProductsModel(SQLModel, table=True):
    __tablename__ = "products"  # type: ignore

    id: uuid.UUID = Field(default_factory=uuid.uuid4,
                          primary_key=True, index=True, nullable=False, unique=True)

    name: str = Field(max_length=255, nullable=False)

    description: str = Field(max_length=1000, nullable=False)

    in_stock: int = Field(default=0, ge=0, nullable=False)

    price: Decimal = Field(
        default=0.00, decimal_places=2, ge=0, nullable=False)

    created_at: datetime = Field(sa_column=Column(
        DateTime(timezone=True), server_default=func.now(), nullable=True))

    seller_id: uuid.UUID = Field(
        foreign_key="customers_details.id", nullable=False)
