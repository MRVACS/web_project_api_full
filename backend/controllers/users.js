const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../errors/not-found-err");
const InvalidDataError = require("../errors/invalid-data-error");
const AuthorizationError = require("../errors/authorization-error");

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
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
module.exports.getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      /* const error = new Error("No se ha encontrado ningún usuario con ese id");
      error.statusCode = 404;
      throw error; */
      throw new NotFoundError("No se ha encontrado ningún usuario con ese id");
    })
    .then((user) => res.send(user))
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
module.exports.createUser = (req, res, next) => {
  console.log("➡️ Entró a /signup");
  console.log("📦 Body recibido:", req.body);
  const { name, about, avatar, email, password } = req.body;
  if (!email || !password) {
    console.log("❌ Faltan email o password");
    throw new InvalidDataError(
      "Uno de los campos se rellenó de forma incorrecta",
    );
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      console.log("🔐 Password hasheada");
      return User.create({ name, about, avatar, email, password: hash });
    })
    .then((user) => {
      /* console.log("✅ Usuario creado:", user._id); */
      res.send(user);
    })
    .catch(
      next /* (err) => {
      console.error("❌ Error creando usuario:", err);
    } */,
    );
};
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: name,
      about: about,
    },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningún usuario con ese id");
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  /* const { avatar } = req.body; */
  const { link } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar: link }, { new: true })
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningún usuario con ese id");
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  /*  console.log("➡️ Entró a /signin");
  console.log("Body recibido:", req.body); */
  const { email, password } = req.body;
  if (!email || !password) {
    throw new InvalidData("no se ha proporcionado uno o más campos");
  }
  /* console.log("➡️ Buscando usuario:", email); */
  /*  User.findOne({ email }).Select; */
  return (
    User.findUserByCredentials(email, password)
      /*   .then((user) => {
      if (!user) {
        throw new NotFoundError(
          "no se ha encontrado al usuario con el correo electrónico o contraseña especificados",
        );
      }
      return user;
    }) */
      .then((user) => {
        /* console.log("✅ Usuario encontrado:", user._id); */
        const token = jwt.sign({ _id: user._id }, "some-secret-key", {
          expiresIn: "7d",
        });
        /* console.log("✅ Token generado"); */

        res.send({ token });
      })
      .catch(
        next /* (err) => {
        console.error("❌ Error en login:", err);
        next(err);
      } */,
      )
  );
  /* User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect password or email"));
      }
      return bcrypt.compare(password, user.password);
    })
    .then((match) => {
      if (!match) {
        return Promise.reject(new Error("Incorrect password or email"));
      }
      res.send({ message: "¡Todo bien!" });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    }); */
};
