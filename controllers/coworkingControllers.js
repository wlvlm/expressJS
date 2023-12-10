const { Coworking } = require("../db/sequelizeSetup");
const { UniqueConstraintError, ValidationError } = require("sequelize");

const findAllCoworkings = (req, res) => {
  Coworking.findAll()
    .then((coworking) => {
      res.json({ data: coworking });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: `Aucun coworking trouvé`, data: error.message });
      console.log(error);
    });
};

const findCoworkingByPk = (req, res) => {
  Coworking.findByPk(parseInt(req.params.id))
    .then((coworking) => {
      res.json({ data: coworking });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: `Aucun coworking trouvé`, data: error.message });
      console.log(error);
    });
};

const createCoworking = (req, res) => {
  const newCoworking = { ...req.body };

  Coworking.create(newCoworking)
    .then((coworking) => {
      res
        .status(201)
        .json({ message: "Le coworking a bien été créé", data: coworking });
    })
    .catch((error) => {
      if (
        error instanceof UniqueConstraintError ||
        error instanceof ValidationError
      ) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({
        message: `Le coworking n'a pas pu être créé`,
        data: error.message,
      });
    });
};

const updateCoworking = (req, res) => {
  Coworking.update(req.body, { where: { id: parseInt(req.params.id) } })
    .then((result) => {
      if (result > 0) {
        Coworking.findByPk(parseInt(req.params.id))
          .then((coworking) => {
            res.json({
              message: "Le coworking a bien été mis à jour.",
              data: coworking,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: `La mise à jour a écoué.`,
              data: error.message,
            });
          });
      } else {
        res
          .status(400)
          .json({ message: `Aucun coworking n'a été mis à jour.` });
      }
    })
    .catch((error) => {
      res.json({
        message: "Une erreur est survenue lors de la mise à jour du coworking.",
        data: error.message,
      });
    });
};

const deleteCoworking = (req, res) => {
  Coworking.findByPk(req.params.id)
    .then((result) => {
      if (result) {
        result
          .destroy()
          .then((result) => {
            res.json({
              mesage: `Le coworking a bien été supprimé.`,
              data: result,
            });
          })
          .catch((error) => {
            res.status(500).json({
              mesage: `La suppression a échoué.`,
              data: error.message,
            });
          });
      } else {
        res.status(400).json({ mesage: `Aucun coworking trouvé.` });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ mesage: `La requête n'a pas aboutie.`, data: error.message });
    });
};

module.exports = {
  findAllCoworkings,
  findCoworkingByPk,
  createCoworking,
  updateCoworking,
  deleteCoworking,
};
