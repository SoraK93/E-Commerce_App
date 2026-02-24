import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getUserCart, addToUserCart, updateUserCart } from "./cartAPI";

const initialState = {
  loading: "initial",
  cartList: [],
};

const handlePending = (state, action) => {
  state.loading = "pending";
};

const handleRejected = (state, action) => {
  state.loading = "rejected";
};

const findTargetCart = (list, id) => {
  return list.find((cart) => cart.product_id === id);
};

const sortCart = (cart) => {
  if (!Array.isArray(cart)) return [];
  return [...cart].sort((a, b) => a.product_id.localeCompare(b.product_id));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment(state, action) {
      const cart = findTargetCart(state.cartList, action.payload);
      if (cart.quantity < cart.in_stock) cart.quantity++;
    },
    decrement(state, action) {
      const cart = findTargetCart(state.cartList, action.payload);
      if (cart.quantity > 0) cart.quantity--;
    },
  },
  extraReducers: (builder) => {
    builder
      // fulfilled cases
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.loading = "fullfilled";
        state.cartList = sortCart(action.payload.cart);
      })
      .addCase(addToUserCart.fulfilled, (state, action) => {
        state.loading = "fullfilled";
        state.cartList.push(...action.payload.cart);
        state.cartList = sortCart(state.cartList);
      })
      .addCase(updateUserCart.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.cartList = sortCart(action.payload.cart);
      })
      // pending cases
      .addMatcher(
        isAnyOf(
          getUserCart.pending,
          addToUserCart.pending,
          updateUserCart.pending,
        ),
        handlePending,
      )
      // rejected cases
      .addMatcher(
        isAnyOf(
          getUserCart.rejected,
          addToUserCart.rejected,
          updateUserCart.rejected,
        ),
        handleRejected,
      );
  },
});

export const { increment, decrement } = cartSlice.actions;

export const selectCartLoading = (state) => state.cart.loading;
export const selectCartList = (state) => state.cart.cartList;

export default cartSlice.reducer;
