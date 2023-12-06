const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const {
  findAllUsers,
  findUserByPk,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

router
  .route("/")
  .get(findAllUsers)
  .post(createUser);

router
  .route("/:id")
  .get(findUserByPk)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
