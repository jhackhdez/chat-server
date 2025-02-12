const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
  // Objeto que almacena todos los errores de validación definidos en el file de rutas
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: error.mapped(),
    });
  }

  next();
};

module.exports = {
  validateFields,
};
