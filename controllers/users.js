const { response } = require("express");
const User = require("../models/user");

const getUsers = async (req, res = response) => {
  // Retornar todos los usuarios excepto el que está conectado y ordenarlos por los que están 'online' primero
  // Propiedad 'sort('-online')' me ordena mostrando primero los que estan online

  // Paginación
  const from = Number(req.query.from) || 0;
  const users = await User.find({ _id: { $ne: req.uid } })
    .sort("-online")
    .skip(from)
    .limit(20);
  res.json({
    ok: true,
    users,
  });
};

module.exports = {
  getUsers,
};
