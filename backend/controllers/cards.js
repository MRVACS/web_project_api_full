const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      console.log("🃏 TARJETAS ENCONTRADAS:", cards);
      console.log("🃏 ¿ES ARRAY?:", Array.isArray(cards));
      res.send(cards);
    })
    .catch((err) => {
      console.error("❌ Error buscando tarjetas:", err);
      let status = 400;
      switch (err.status) {
        case 404:
          status = 404;
          break;
        case 500:
          status = 500;
          break;
        default:
          status = 400;
          break;
      }
      res.status(status).send({ message: err.message });
    });
};

module.exports.createCard = (req, res) => {
  /*   console.log("🃏 CREATE CARD - Entró al controller");
  console.log("📦 Body:", req.body);
  console.log("👤 User:", req.user); */
  const { name, link } = req.body;
  /* console.log("📝 name:", name);
  console.log("🔗 link:", link);
  console.log("🆔 owner:", req.user?._id); */
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      /* console.log("✅ Tarjeta creada:", card); */
      res.send(card);
    })
    .catch((err) => {
      /* console.error("❌ Error creando tarjeta:", err); */
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con ese id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch(
      next /* (err) => {
      let status = 400;
      switch (err.status) {
        case 404:
          status = 404;
          break;
        case 500:
          status = 500;
          break;
        default:
          status = 400;
          break;
      }
      res.status(status).send({ message: err.message });
    } */,
    );
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con ese id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      let status = 400;
      switch (err.status) {
        case 404:
          status = 404;
          break;
        case 500:
          status = 500;
          break;
        default:
          status = 400;
          break;
      }
      res.status(status).send({ message: err.message });
    });
};
module.exports.unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con ese id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      let status = 400;
      switch (err.status) {
        case 404:
          status = 404;
          break;
        case 500:
          status = 500;
          break;
        default:
          status = 400;
          break;
      }
      res.status(status).send({ message: err.message });
    });
};
