from fastapi import APIRouter

import controller.order as order

router = APIRouter(
    prefix="/order",
    tags=["order"]
)


# TODO: handle this in the order page
@router.get("/")
async def get_customer_order():
    await order.fetch_all_customer_orders()


# TODO: handle this in the order page
@router.get("/{order_id}")
async def get_customer_order_by_id():
    await order.fetch_order_by_id()


# TODO: should save a new order to db
@router.post("/")
async def create_customer_order():
    await order.create_new_order()


# TODO: should edit cart, user delivery detail and payment mode
@router.put("/{order_id}")
async def update_customer_order_by_id():
    await order.edit_order_details()


# TODO: cancel a successfully created order. It's not a delete, should show in customers history.
@router.patch("/{order_id}")
async def delete_customer_order_by_id():
    await order.cancel_order_by_id()
