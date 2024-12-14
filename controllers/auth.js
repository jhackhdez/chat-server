const { response } = require("express");
const { validationResult } = require("express-validator");

const createUser = (req, res = response) => {
  // Objeto que almacena todos los errores de validación definidos en el file de rutas
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: error.mapped(),
    });
  }

  res.json({
    ok: true,
    msg: "Create user!!!",
  });
};

module.exports = {
  createUser,
};
