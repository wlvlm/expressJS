module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Le mail est déjà pris",
      },
      validate: {
        isEmail: {
          msg: "Le mail doit être valide",
        },
        notEmpty: {
          msg: "Le mail ne peut pas être vide",
        },
        len: {
          msg: "Le mail doit avoir un nombre de caractères compris entre 2 et 50.",
          args: [5, 50],
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le mot de passe ne peut être vide",
        },
      },
    },
  });
};
