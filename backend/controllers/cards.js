const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-error");
const Card = require("../models/card");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    /* .orFail(() => {
      throw new NotFoundError("Error buscando tarjetas");
    }) */
    .then((cards) => {
      console.log("🃏 TARJETAS ENCONTRADAS:", cards);
      console.log("🃏 ¿ES ARRAY?:", Array.isArray(cards));
      res.send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ninguna tarjeta con ese id");
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError(
          "No puedes eliminar una tarjeta que no te pertenece",
        );
      }
      return card.deleteOne();
    })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ninguna tarjeta con ese id");
    })
    .then((card) => res.send(card))
    .catch(next);
};
module.exports.unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ninguna tarjeta con ese id");
    })
    .then((card) => res.send(card))
    .catch(next);
};
