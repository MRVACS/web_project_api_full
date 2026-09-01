const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");

const validateURL = require("../middlewares/url-validator");
router.get("/", getUsers);
router.get("/me", getUserById);
router.get("/:userId", getUserById);
/* router.post("/", createUser); */
router.patch("/me", updateUser);
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
