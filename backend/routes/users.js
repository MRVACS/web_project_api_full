const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");

const validateURL = require("../middlewares/url-validator");
router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:userId", getUserById);
/* router.post("/", createUser); */
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
