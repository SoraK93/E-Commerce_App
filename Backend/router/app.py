from fastapi import FastAPI

app = FastAPI(
  title="E-Commerce App Backend",
  description="This is the backend of my E-Commerce App",
  version="0.0.1"
)

app.get("/products")