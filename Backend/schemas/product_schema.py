from uuid import UUID

from pydantic import BaseModel, ConfigDict


class SellerResponseModel(BaseModel):
    id: UUID
    name: str

    model_config = ConfigDict(from_attributes=True, extra="ignore")


class ProductResponseModel(BaseModel):
    id: UUID
    name: str
    description: str
    in_stock: int
    price: float
    seller: SellerResponseModel

    model_config=ConfigDict(from_attributes=True, extra='ignore')
