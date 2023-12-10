const express = require("express");
const router = express.Router();
const { protect, restrict } = require("../controllers/authController");
const {
  findAllCoworkings,
  findCoworkingByPk,
  createCoworking,
  updateCoworking,
  deleteCoworking,
} = require("../controllers/coworkingControllers");

router
  .route("/")
  .get(findAllCoworkings)
  .post(protect, restrict, createCoworking);

router
  .route("/:id")
  .get(findCoworkingByPk)
  .put(protect, restrict, updateCoworking)
  .delete(protect, restrict, deleteCoworking);

module.exports = router;
