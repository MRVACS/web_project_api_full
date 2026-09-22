const express = require("express");
require("dotenv").config();
const { PORT = 3000 } = process.env;
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/aroundb");
const auth = require("./middlewares/auth");
const app = express();
const validateUser = require("./middlewares/user-validator");

const { login, createUser } = require("./controllers/users");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require("cors");
const { errors } = require("celebrate");

app.use(express.json());

app.use(cors());
app.options("/*splat", cors());
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.post("/signin", validateUser, login);
app.post("/signup", validateUser, createUser);
app.use(auth);
app.use("/cards", cardsRouter);
app.use("/users", usersRouter);

app.use(errorLogger);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Recurso solicitado no encontrado",
  });
});
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "An error has ocurred on the server" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port: ${PORT}`);
});
