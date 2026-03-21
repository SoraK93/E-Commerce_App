from config import setting
import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from router.auth import router as auth
from router.product import router as products
from router.user import router as user

load_dotenv()

app = FastAPI(
    title="E-Commerce App Backend",
    description="This is the backend of my E-Commerce App"
)

app.add_middleware(SessionMiddleware,
                   secret_key=setting.S_SECRET,
                   max_age=60 * 60 * 24,
                   same_site="lax",
                   https_only=True)

app.add_middleware(CORSMiddleware,
                   allow_origins=[setting.CLIENT_URL],
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
        host=setting.SERVER_HOST,
        port=setting.SERVER_PORT,
        reload=True,
        ssl_certfile="./localhost+3.pem",
        ssl_keyfile="./localhost+3-key.pem"
    )
