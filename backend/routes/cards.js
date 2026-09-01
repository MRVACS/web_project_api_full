const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require("../controllers/cards");
const validateURL = require("../middlewares/url-validator");
router.get("/", getCards);
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  createCard,
);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", unlikeCard);

module.exports = router;
