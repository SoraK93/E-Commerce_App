from fastapi import HTTPException, status
from sqlalchemy.orm import selectinload
from sqlmodel import select

from model.cart_model import CartModel
from model.database import SessionDep
from model.product_model import ProductsModel
from model.session_model import SessionModel
from schemas.cart_schema import CartAddProductModel, CartBaseModel


async def fetch_all_cart_items(db_session: SessionDep, user_session: SessionModel):
    result = await db_session.exec(select(CartModel)
                             .where(CartModel.user_id == user_session.user_id)
                             .options(selectinload(CartModel.product)))
    cart_in_db = result.all()
    if not len(cart_in_db):
        return []

    return [CartBaseModel.model_validate(item) for item in cart_in_db]



async def add_item_to_cart(product_data: CartAddProductModel, db_session: SessionDep, user_session: SessionModel):
    # check if product is available
    result_product = await db_session.exec(select(ProductsModel)
                                           .where(ProductsModel.id == product_data.product_id))
    product_in_db: ProductsModel = result_product.first()
    if not product_in_db or not product_in_db.in_stock or product_in_db.deleted_at:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Cannot add product to cart. Product not found.")

    # checks if a cart already exists
    result_cart = await db_session.exec(select(CartModel)
                                        .where(CartModel.product_id == product_data.product_id,
                                               CartModel.user_id == user_session.user_id)
                                        .options(selectinload(CartModel.product)))
    cart_in_db: CartModel = result_cart.first()

    # calculate new quantity for product in cart and verify with product current stock.
    current_quantity = cart_in_db.quantity if cart_in_db else 0
    new_quantity = current_quantity + product_data.quantity
    if new_quantity > product_in_db.in_stock:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Product has insufficient stock. Cart ")

    # add proper data to database session for commit
    if cart_in_db:
        cart_in_db.quantity = new_quantity
        db_session.add(cart_in_db)
    else:
        cart_in_db = CartModel(**product_data.model_dump(), user_id=user_session.user_id)
        db_session.add(cart_in_db)

    await db_session.commit()
    # refresh and return cart data with product.
    await db_session.refresh(cart_in_db, ["product"])
    return [CartBaseModel.model_validate(cart_in_db)]


async def edit_item_quantity(product_data: CartAddProductModel, db_session: SessionDep, user_session: SessionModel):
    result = await db_session.exec(select(CartModel)
                                   .where(CartModel.user_id == user_session.user_id))
    cart_in_db = result.all()
    if not len(cart_in_db):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Cart is empty")



async def remove_item_from_cart():
    pass
