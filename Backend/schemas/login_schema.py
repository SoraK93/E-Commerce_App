from pydantic import BaseModel, EmailStr


class LoginRequestModel(BaseModel):
    email: EmailStr
    password: str


class LoginResponseModel(BaseModel):
    name: str
    phone: str
    address: str
    email: EmailStr
    is_seller: bool
