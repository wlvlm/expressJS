const { User } = require("../db/sequelizeSetup");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (!result) {
        return res
          .status(404)
          .json({ message: `Le mail ${req.body.email} n'existe pas` });
      }
      bcrypt.compare(req.body.password, result.password).then((isValid) => {
        if (!isValid) {
          return res
            .status(401)
            .json({ message: `Le mot de passe est incorrect` });
        }
        res.json({ message: "Le mot de passe est valide" });
      });
      //   res.json({ hello: "world" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

module.exports = login;
