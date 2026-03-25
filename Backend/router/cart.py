from fastapi import APIRouter

router = APIRouter(
    prefix="/cart",
    tags=["cart"]
)


@router.get("/")
async def get_all_cart():
    pass


@router.post("/")
async def create_new_cart():
    pass


@router.patch("/")
async def update_cart():
    pass
