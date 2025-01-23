/**
 * Se definen métodos de interacción con los sockets
 */

const User = require("../models/user");
const Message = require("../models/message");

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

const saveMessage = async (payload) => {
  /*
    {
      from: ''
      to: ''
      text: ''
    }
  */
  try {
    const message = new Message(payload);
    await message.save();
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  connectedUser,
  disconnectedUser,
  saveMessage,
};
