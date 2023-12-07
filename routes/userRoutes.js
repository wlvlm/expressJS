const express = require("express");
const router = express.Router();
const {
  findAllUsers,
  findUserByPk,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const { login, protect } = require("../controllers/authController.js");

router.route("/").get(findAllUsers).post(createUser);

router.route("/login").post(login);

router.route("/:id").get(findUserByPk).put(updateUser).delete(deleteUser);

module.exports = router;
