from uuid import UUID

from pydantic import BaseModel, ConfigDict


class SellerResponseModel(BaseModel):
    id: UUID
    name: str

    model_config = ConfigDict(from_attributes=True, extra="ignore")


class ProductCreateModel(BaseModel):
    name: str
    description: str
    in_stock: int
    price: float

    model_config = ConfigDict(from_attributes=True, extra='ignore')


class ProductCreateRequestModel(BaseModel):
    id: UUID


    model_config = ConfigDict(from_attributes=True, extra="ignore")


class ProductResponseModel(ProductCreateModel):
    id: UUID
    seller: SellerResponseModel

    model_config = ConfigDict(from_attributes=True, extra='ignore')
