import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT } from "../CONSTANT";

const getUser = createAsyncThunk("users/getUser", async () => {
  try {
    const response = await fetch(`${ENDPOINT}/user`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
});

const updateUser = createAsyncThunk("users/updateUser", async (updateData) => {
  try {
    const response = await fetch(`${ENDPOINT}/user/update`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();

    return data.user;
  } catch (error) {
    console.error(error);
  }
});

const getEmail = async () => {
  const response = await fetch(`${ENDPOINT}/user/email`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  return data.email;
};

const changeUserPassword = async ({ oldPassword, newPassword }) => {
  const response = await fetch(`${ENDPOINT}/user/change-password`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to change password");
  }

  return { success: true };
};

export { getUser, updateUser, getEmail, changeUserPassword };
