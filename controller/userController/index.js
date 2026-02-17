const bcrypt = require("bcrypt")

const pool = require("../../model/database");
const queryReturnError = require("../../utility/api-errors");
const { genPatchRouteQueryList } = require("../../utility/api-helper");

const dependencies = { bcrypt, pool, queryReturnError, genPatchRouteQueryList };

module.exports = {
  getUsers: require("./_getUsers")(dependencies),
  updateUserById: require("./_updateUserById")(dependencies),
  deleteUserById: require("./_deleteUserById")(dependencies),
  getUserEmail: require("./_getUserEmail")(dependencies),
  changeUserPassword: require("./_changeUserPassword")(dependencies),
};
