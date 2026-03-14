from fastapi import APIRouter

product = APIRouter(
  prefix="/product"
)

product.get("/")