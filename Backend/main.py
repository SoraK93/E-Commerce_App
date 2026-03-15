from fastapi import FastAPI

from .router.products import products

app = FastAPI(
    title="E-Commerce App Backend",
    description="This is the backend of my E-Commerce App",
    version="0.0.1"
)

app.include_router(products)


@app.get("/")
async def root():
    return { "message": "Welcome to E-Commerce App Backend"}