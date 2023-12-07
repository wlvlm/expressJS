const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const {
  findAllCoworkings,
  findCoworkingByPk,
  createCoworking,
  updateCoworking,
  deleteCoworking,
} = require("../controllers/coworkingControllers");

router.route("/").get(findAllCoworkings).post(protect, createCoworking);

router
  .route("/:id")
  .get(findCoworkingByPk)
  .put(protect, updateCoworking)
  .delete(protect, deleteCoworking);

module.exports = router;
