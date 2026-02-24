import { configureStore } from "@reduxjs/toolkit";

import { users, products } from "../features";
import cartReducer from "../features/cart/api/cartSlice";

export const store = configureStore({
  reducer: {
    products: products.reducer,
    users: users.reducer,
    cart: cartReducer,
  },
});
