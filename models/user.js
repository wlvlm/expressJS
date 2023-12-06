module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Le mail est déjà pris",
      },
      validate: {
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
          msg: "Le mot de passe doit être rempli",
        },
        not: {
          msg: "Le mot de passe doit avoir une majuscule, une minuscule, un nombre, un caractère spécial et au moins 5 caractères",
          args: "/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/gm",
        },
      },
    },
  });
};
