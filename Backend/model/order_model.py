from datetime import datetime
from typing import Literal
from uuid import UUID, uuid4

from sqlalchemy import Column, DateTime, func
from sqlmodel import SQLModel, Field, Relationship


class OrderModel(SQLModel, table=True):
    __tablename__ = "customer_order"

    id: UUID = Field(default_factory=uuid4, primary_key=True)

    product_id: UUID = Field(foreign_key="products.id", nullable=False)

    user_id: UUID = Field(foreign_key="customers_details.id", nullable=False, index=True)

    quantity: int = Field(gt=0, nullable=False)

    payment_status: bool

    payment_mode: Literal["Cash", "Online"]

    ordered_on: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now(), nullable=False))

    cancelled_on: None | datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=None, nullable=True))
