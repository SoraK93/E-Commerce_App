import uuid
from sqlmodel import SQLModel, Field


class Products(SQLModel, table=True):
    __tablename__ = "products" # type: ignore

    id: uuid.UUID = Field(default_factory=uuid.uuid4,
                          primary_key=True,
                          index=True,
                          nullable=False)
    name: str = Field(max_length=255, nullable=False)
    description: str = Field(max_length=1000, nullable=False)
    in_stock: int = Field(default=0, ge=0, nullable=False)
    price: float = Field(default=0.00, gt=0, nullable=False)
    seller_id: uuid.UUID = Field(nullable=False)
