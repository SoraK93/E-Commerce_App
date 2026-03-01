import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT } from "../../CONSTANT";

// get list of order objects
// use cart table to create order list

export const getOrderList = createAsyncThunk("order/getOrderList", async () => {
  const response = await fetch(`${ENDPOINT}/order`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch order list");
  
  return data;
});
