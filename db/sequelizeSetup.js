const CoworkingModel = require("../models/coworking");
const UserModel = require("../models/user");
const RoleModel = require("../models/roleModel");
const { Sequelize, DataTypes } = require("sequelize");
const { setCoworkings, setUsers, setRoles } = require("./setDataSample");

const sequelize = new Sequelize("bordeaux_coworkings", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
});

const Coworking = CoworkingModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Role = RoleModel(sequelize, DataTypes);

sequelize
  .sync({ force: true })
  .then(() => {
    setCoworkings(Coworking);
    setUsers(User);
    setRoles(Role);
  })
  .catch((error) => {
    console.log(error.message);
  });

sequelize
  .authenticate()
  .then(() =>
    console.log("La connexion à la base de données a bien été établie.")
  )
  .catch((error) =>
    console.error(`Impossible de se connecter à la base de données ${error}`)
  );

module.exports = { sequelize, Coworking, User };
