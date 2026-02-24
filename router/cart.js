const express = require("express");
const {
  getAllCart,
  createNewCart,
  updateCart,
} = require("../controller/cartController/index");
const { checkLoggedIn } = require("../utility/api-auth")

const cart = express.Router();

cart.get("/", checkLoggedIn, getAllCart);

cart.post("/", checkLoggedIn, createNewCart);

cart.patch("/", checkLoggedIn, updateCart);

module.exports = cart;
