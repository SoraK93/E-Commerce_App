import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT } from "../../CONSTANT";

const getProductBySeller = createAsyncThunk("", async () => {
  const response = await fetch(`${ENDPOINT}/user/view-product`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) throw new Error("Internal Server Error");

  if (response.status === 204) throw new Error("No product found");

  return data;
});

const addProductBySeller = async (formData) => {
  const response = await fetch(`${ENDPOINT}/product`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Product not created");
  }

  return data;
};

const editProductBySeller = async () => {
  const response = await fetch(`${ENDPOINT}/`);
};

export { getProductBySeller, addProductBySeller, editProductBySeller };
