const express = require("express");
let mockCoworkings = require("../mock-coworking");
const { Op } = require("sequelize");
const router = express.Router();
const { Coworking } = require("../db/sequelizeSetup");

router
  .route("/")
  .get((req, res) => {
    Coworking.findAll({
      where: {
        name: {
          [Op.substring]: req.query.search,
        },
      },
    })
      .then((coworking) => {
        res.json({ data: coworking });
      })
      .catch((error) => {
        res.json({ message: `Aucun coworking trouvé`, data: error.message });
        console.log(error);
      });
  })
  .post((req, res) => {
    const newCoworking = { ...req.body };
    Coworking.create(newCoworking)
      .then((coworking) => {
        res.json({ message: "Le coworking a bien été créé", data: coworking });
        console.log(coworking);
      })
      .catch((error) => {
        res.json({
          message: `Le coworking n'a pas pu être créé`,
          data: error.message,
        });
        console.log(error);
      });
  });

router
  .route("/:id")
  .get((req, res) => {
    Coworking.findByPk(parseInt(req.params.id))
      .then((coworking) => {
        res.json({ data: coworking });
      })
      .catch((error) => {
        res.json({ message: `Aucun coworking trouvé`, data: error.message });
        console.log(error);
      });
  })
  .put((req, res) => {
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
              res.json({
                message: `Aucun coworking trouvé`,
                data: error.message,
              });
            });
        } else {
          res.json({ message: `Aucun coworking n'a été mis à jour.` });
        }
      })
      .catch((error) => {
        res.json({
          message:
            "Une erreur est survenue lors de la mise à jour du coworking",
          data: error.message,
        });
      });
  })

  .delete((req, res) => {
    Coworking.findByPk(parseInt(req.params.id))
      .then((coworking) => {
        Coworking.destroy({ where: { id: coworking.id } })
          .then((result) => {
            if (result > 0) {
              res.json({
                message: `Le coworking a bien été supprimé`,
                data: coworking,
              });
            } else {
              res.json({ message: `Aucun coworking n'a été supprimé.` });
            }
          })
          .catch((error) => {
            res.json({
              message: `La supression a échoué`,
              data: error.message,
            });
          });
      })
      .catch((error) => {
        res.json({ message: `Aucun coworking trouvé`, data: error.message });
        console.log(error);
      });
  });

module.exports = router;
