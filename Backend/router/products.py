from fastapi import APIRouter

products = APIRouter(
  prefix="/products",
  tags=["products"]
)


@products.get("/")
async def prod():
    return {"message": "product works"}
