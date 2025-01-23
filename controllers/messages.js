const Message = require("../models/message");

const getChat = async (req, res) => {
  const myId = req.uid;
  const messagesFrom = req.params.from;

  // cargar últimos 30 mensajes
  const last30 = await Message.find({
    $or: [
      { from: myId, to: messagesFrom },
      { from: messagesFrom, to: myId },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(30);

  res.json({
    ok: true,
    messages: last30,
  });
};

module.exports = {
  getChat,
};
