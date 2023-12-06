module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Coworking", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msh: "Le nom est déjà pris",
      },
      validate: {
        notEmpty: {
          msg: "Le nom ne peut pas être vide",
        },
        len: {
          msg: "Le nom doit avoir un nombre de caractères compris entre 2 et 50.",
          args: [5, 50],
        },
      },
    },
    price: {
      type: DataTypes.JSON,
      validate: {
        isPriceValid(value) {
          if (
            value.hasOwnProperty("hour") &&
            value.hasOwnProperty("day") &&
            value.hasOwnProperty("month")
          ) {
            if (
              value.hour === null &&
              value.day === null &&
              value.month === null
            ) {
              throw new Error(
                "Au moins un des trois tarfis doit être renseigné"
              );
            }
          } else {
            throw new Error(
              'Les propriétés des tarifs doivent être nommées "hour", "day" et "month"'
            );
          }
        },
      },
    },
    address: {
      type: DataTypes.JSON,
    },
    superficy: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {},
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
  });
};
