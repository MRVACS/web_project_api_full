const express = require("express");
const process = require("dotenv").config();
console.log(process);
const { PORT = 3000 } = process.parsed;
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/aroundb");
const auth = require("./middlewares/auth");
const app = express();
/* app.use((req, res, next) => {
  console.log("🔥 PETICIÓN RECIBIDA:", req.method, req.url);
  next();
}); */
/* app.get("/test", (req, res) => {
  console.log("🔥🔥🔥 LLEGÓ A /test");
  res.send("Backend funcionando");
}); */
const { login, createUser } = require("./controllers/users");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cors = require("cors");

app.use(express.json());
/* app.use((req, res, next) => {
  console.log("🔥 PETICIÓN:", req.method, req.originalUrl);
  next();
}); */
app.use(cors());
app.options("/*splat", cors());
app.use(requestLogger);
/* app.use((req, res, next) => {
  console.log("🌐 REQUEST:", req.method, req.path);
  console.log("🔐 AUT H HEADER:", req.headers.authorization);
  next();
}); */
app.post("/signin", login);
app.post("/signup", createUser);
app.use(auth);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

/* app.get("/{*splat}", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
}); */
app.use(errorLogger);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Recurso solicitado no encontrado",
  });
});
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
