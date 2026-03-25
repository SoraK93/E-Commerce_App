from fastapi import APIRouter

router = APIRouter(
    prefix="/order",
    tags=["order"]
)


@router.get("/")
async def get_customer_order():
    pass


@router.get("/{order_id}")
async def get_customer_order_by_id():
    pass


@router.post("/")
async def create_customer_order():
    pass


@router.patch("/{order_id}")
async def update_customer_order_by_id():
    pass


@router.delete("/{order_id}")
async def delete_customer_order_by_id():
    pass
