const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const { Users } = require("../db/sequelizeSetup");

router
  .route("/")
  .get((req, res) => {
    res.json({ message: "Endpoint Users get" });
  })
  .post((req, res) => {
    res.json({ message: "Endpoint Users put" });
  });

router
  .route("/:id")
  .get((req, res) => {
    res.json({ message: "Endpoint Users get id" });
  })
  .put((req, res) => {
    res.json({ message: "Endpoint Users put id" });
  })
  .delete((req, res) => {
    res.json({ message: "Endpoint Users delete id" });
  });

module.exports = router;
