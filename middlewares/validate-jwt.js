const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  // Leer Token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "There is NO token in request",
    });
  }

  try {
    // Extraer 'uid' del token
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    // Guardar 'uid' del usurio en el en request, de esta manera será accesible en todo momento
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
