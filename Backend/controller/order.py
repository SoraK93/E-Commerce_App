from fastapi import HTTPException, status
from sqlmodel import select

from model import ProductsModel
from model.order_model import OrderModel
from model.database import SessionDep
from model.session_model import SessionModel
from schemas.order_schema import OrderRequestModel, OrderCreateModel


async def fetch_all_customer_orders(db_session: SessionDep, user_session: SessionModel):
    pass


async def fetch_order_by_id(db_session: SessionDep, user_session: SessionModel):
    pass


async def create_new_order(db_session: SessionDep, user_session: SessionModel, order_data: OrderRequestModel):
    created_order = []
    try:
        for item in order_data.cart:
            product_in_db = await db_session.get(ProductsModel, item.product_id)
            if not product_in_db:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail="Cannot process order. Product")

            if item.quantity > product_in_db.in_stock:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                    detail="Cannot process order. Insufficient stock.")

            data = OrderModel(**item.model_dump(), user_id = user_session.user_id)

            product_in_db.in_stock -= data.quantity

            db_session.add(data)
            created_order.append(data)

        await db_session.commit()

        for order in created_order:
            await db_session.refresh(order)
    except Exception as err:
        await db_session.rollback()
        print(err)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Order creating failed.")


async def edit_order_details(db_session: SessionDep, user_session: SessionModel):
    pass


async def cancel_order_by_id(db_session: SessionDep, user_session: SessionModel):
    pass
