const express = require("express");
const passport = require("passport");

const {
  authLogin,
  authRegister,
  authLogout,
} = require("../controller/authController");
const { authenticateLogin } = require("../utility/api-auth")
const auth = express.Router();

auth.post("/login", authenticateLogin, authLogin);

auth.post("/register", authRegister);

auth.post("/logout", authLogout);

module.exports = auth;
