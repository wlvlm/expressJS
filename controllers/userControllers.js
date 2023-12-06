const { User } = require("../db/sequelizeSetup");

const findAllUsers = (req, res) => {
  res.json({ message: "Endpoint Users get" });
};

const findUserByPk = (req, res) => {
  res.json({ message: "Endpoint Users get id" });
};

const createUser = (req, res) => {
  res.json({ message: "Endpoint Users put" });
};

const updateUser = (req, res) => {
  res.json({ message: "Endpoint Users update" });
};

const deleteUser = (req, res) => {
  res.json({ message: "Endpoint Users delete" });
};

module.exports = {
  findAllUsers,
  findUserByPk,
  createUser,
  updateUser,
  deleteUser,
};
