const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          reject("JWT could NOT be generated");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const checkJWT = (token = '') => {
  try {
    // Extraer 'uid' del token
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    // Guardar 'uid' del usurio en el en request, de esta manera será accesible en todo momento
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};

module.exports = {
  generateJWT,
  checkJWT
};
