/**
 * Se definen métodos de interacción con los sockets
 */

const User = require("../models/user");
const { use } = require("../routes/auth");

const connectedUser = async (uid = "") => {
  const user = await User.findById(uid);
  user.online = true;

  // se graba en BBDD
  await user.save();

  return user;
};

const disconnectedUser = async (uid = "") => {
    const user = await User.findById(uid);
    user.online = false;
  
    // se graba en BBDD
    await user.save();
  
    return user;
  };

module.exports = {
  connectedUser,
  disconnectedUser
};
