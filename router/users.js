const express = require("express");
const {
  getUsers,
  getSellerById,
  updateUserById,
  deleteUserById,
  getUserEmail,
  changeUserPassword,
} = require("../controller/userController");
const { checkOwnerShip, checkLoggedIn } = require("../utility/api-auth");

const user = express.Router();

user.get("/", checkLoggedIn, getUsers);

user.get("/seller-profile", getSellerById);

user.patch("/update", checkLoggedIn, updateUserById);

user.delete("/delete", checkLoggedIn, deleteUserById);

user.get("/email", checkLoggedIn, getUserEmail)

user.patch("/change-password", checkLoggedIn, changeUserPassword)

module.exports = user;
