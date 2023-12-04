const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const { Users } = require("../db/sequelizeSetup");

router.route("/").get((req, res) => {
  res.json({ message: "Endpoint Users" });
});

module.exports = router;
