const express = require("express");
const {
  getUsers,
  updateUserById,
  deleteUserById,
  getUserEmail,
  changeUserPassword,
} = require("../controller/userController");
const { getSellerById, getProductBySellerId } = require("../controller/sellerController");
const { checkOwnerShip, checkLoggedIn } = require("../utility/api-auth");

const user = express.Router();

user.get("/", checkLoggedIn, getUsers);

user.patch("/update", checkLoggedIn, updateUserById);

user.delete("/delete", checkLoggedIn, deleteUserById);

user.get("/email", checkLoggedIn, getUserEmail);

user.patch("/change-password", checkLoggedIn, changeUserPassword);

user.get("/seller-profile", getSellerById);

user.get("/view-product", checkLoggedIn, getProductBySellerId);

module.exports = user;
