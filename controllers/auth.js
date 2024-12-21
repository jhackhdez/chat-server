const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const duplicateEmail = await User.findOne({ email });
    // Se valida si ya existe el correo creado en BBDD
    if (duplicateEmail) {
      return res.status(400).json({
        ok: false,
        msg: "The email is already registered",
      });
    }
    const user = new User(req.body);
    // Encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    // Para guardar en BBDD
    await user.save();
    // Generate JWT
    const token = await generateJWT(user.id);
    // Respuesta
    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk to administrator",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // Validar email
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "email not found",
      });
    }
    // Validar password
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "password does not match",
      });
    }
    // Generar el JWT
    const token = await generateJWT(userDB.id);
    // Respuesta
    res.json({
      ok: true,
      user: userDB,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Talk to administrator",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  // Generar un nuevo 'JWT'
  const token = await generateJWT(uid);
  // Obtener usuario por 'uid'
  const userDB = await User.findById(uid);

  res.json({
    ok: true,
    user: userDB,
    token,
  });
}

module.exports = {
  createUser,
  login,
  renewToken
};
