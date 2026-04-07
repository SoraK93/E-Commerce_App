import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT } from "../../CONSTANT";

// get list of order objects
// use cart table to create order list

const getOrderList = createAsyncThunk("order/getOrderList", async () => {
  const response = await fetch(`${ENDPOINT}/order/`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch order list");

  return data;
});

const createOrder = createAsyncThunk("order/createOrder", async (orderData) => {
  console.log(orderData);
  const response = await fetch(`${ENDPOINT}/order/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cart: orderData }),
  });

  const data = await response.json();
  if (!response.ok)
    return { status: response.status, statusText: response.statusText };

  return data;
});

export { getOrderList, createOrder };
