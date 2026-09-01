const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    /* required: true, */
    minlength: 2,
    maxlength: 30,
    default: "Jacques Costeau",
  },
  about: {
    type: String,
    /* required: true, */
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    /* required: true, */
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: function (v) {
        return /^(http|https):\/\/(www.)?(\w|\W)+/.test(v);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        /* return this.validator.isEmail(v); */
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  /* console.log("📧 Email recibido:", email);
  console.log("🗄️ Base de datos:", this.db.name);
  console.log("📁 Colección:", this.collection.name); */
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      console.log("👤 Resultado:", user ? "USUARIO ENCONTRADO" : "NULL");

      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      /* console.log("🔐 Tiene password:", !!user.password); */
      return bcrypt.compare(password, user.password).then((matched) => {
        /* console.log("🔑 Password coincide:", matched); */
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user; // ahora user está disponible
      });
    });
};

module.exports = mongoose.model("user", userSchema);
