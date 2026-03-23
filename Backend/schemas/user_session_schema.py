from uuid import UUID

from pydantic import BaseModel


class UserSessionResponseModel(BaseModel):
    id: UUID
    name: str
    phone: str
    address: str
    is_seller: bool
