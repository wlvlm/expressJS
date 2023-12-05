const express = require("express");
let mockCoworkings = require("../mock-coworking");
const { Op } = require("sequelize");
const router = express.Router();
const {
  findAllCoworkings,
  findCoworkingByPk,
  createCoworking,
  updateCoworking,
  deleteCoworking,
} = require("../controllers/coworkingControllers");

router.route("/").get(findAllCoworkings).post(createCoworking);

router
  .route("/:id")
  .get(findCoworkingByPk)
  .put(updateCoworking)
  .delete(deleteCoworking);

module.exports = router;
