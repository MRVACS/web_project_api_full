const jwt = require("jsonwebtoken");
const InvalidDataError = require("../errors/invalid-data-error");
const AuthorizationError = require("../errors/authorization-error");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log("🔐 AUTH - Authorization recibido:", authorization);
  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log("❌ AUTH - No hay token o formato incorrecto");
    /* return next({ message: "Se requiere autorización", statusCode: 401 }); */
    throw new InvalidDataError(
      "Token no proporcionado o proporcionado en el formato incorrecto",
    );
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
    console.log("✅ AUTH - Token válido:", payload);
  } catch (err) {
    console.log("❌ AUTH - Token inválido:", err.message);
    /* return res.status(401).send({ message: "Se requiere autorización" }); */
    throw new AuthorizationError("El token provisto es inválido");
  }

  req.user = payload; // asigna el payload al objeto de solicitud
  console.log("👤 AUTH - req.user:", req.user);
  next(); // envía la solicitud al siguiente middleware
};
