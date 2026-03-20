import os
import uvicorn

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from router.product import router as products
from router.auth import router as auth
from router.user import router as user

load_dotenv()

app = FastAPI(
    title="E-Commerce App Backend",
    description="This is the backend of my E-Commerce App",
    version="0.0.1"
)

origins = ["https://localhost:5173"]

app.add_middleware(SessionMiddleware,
                   secret_key=os.environ["S_SECRET"],
                   max_age=60*60*24,
                   same_site="lax",
                   https_only=True)

app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])

app.include_router(products)
app.include_router(auth)
app.include_router(user)


@app.get("/")
async def root():
    return {"message": "Welcome to E-Commerce App Backend"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.environ["SERVER_PORT"]),
        reload=True,
        ssl_certfile="./localhost+3.pem",
        ssl_keyfile="./localhost+3-key.pem"
    )
