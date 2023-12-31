const { User, Role } = require("../db/sequelizeSetup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret_key = require("../configs/tokenData");

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

        const token = jwt.sign(
          {
            data: result.email,
          },
          secret_key,
          { expiresIn: "1h" }
        );
        res.json({ message: "Login réussi", data: token });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

const protect = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: `Vous n'êtes pas authentifié.` });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, secret_key);
      req.email = decoded.data;
      next();
    } catch (error) {
      return res.status(403).json({ message: `Le jeton n'est pas valide.` });
    }
  }
};

const restrict = (req, res, next) => {
  User.findOne({ where: { email: req.email } })
    .then((user) => {
      Role.findByPk(user.RoleId)
        .then((role) => {
          if (role.label === "admin") {
            next();
          } else {
            res.status(403).json({ message: "Droits insuffisants" });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = {
  login,
  protect,
  restrict,
};
