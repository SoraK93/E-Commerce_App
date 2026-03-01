import { configureStore } from "@reduxjs/toolkit";

import { users, products } from "../features";
import cartReducer from "../features/cart/api/cartSlice";
import orderReducer from "../features/orders/api/orderSlice";

export const store = configureStore({
  reducer: {
    products: products.reducer,
    users: users.reducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
