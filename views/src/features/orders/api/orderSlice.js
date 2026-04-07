import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createOrder, getOrderList } from "./orderAPI";

const handlePending = (state, _) => {
  state.loading = "pending";
};

const handleReject = (state, _) => {
  state.loading = "rejected";
};

const initialState = {
  loading: "initial",
  list: [],
};

const order = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fulfilled case
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.list = action.payload;
      })

      .addCase(createOrder.fulfilled, (state, _) => {
        state.loading = "fulfilled";
      })
      // pending case
      .addMatcher(
        isAnyOf(getOrderList.pending, createOrder.pending),
        handlePending,
      )
      // rejected case
      .addMatcher(
        isAnyOf(getOrderList.rejected, createOrder.rejected),
        handleReject,
      );
  },
});

export default order.reducer;

export const selectOrderLoading = (state) => state.order.loading;
export const selectOrderList = (state) => state.order.list;
