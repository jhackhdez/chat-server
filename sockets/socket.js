const { io } = require("../index");
const { checkJWT } = require("../helpers/jwt");
const { connectedUser, disconnectedUser, saveMessage } = require("../controllers/socket");

io.on("connection", (client) => {
  const [valid, uid] = checkJWT(client.handshake.headers["x-token"]);

  if (!valid) {
    return client.disconnect();
  }

  connectedUser(uid);
  client.join(uid);

  // Escuchar mensajes privados
  client.on("private-message", async (payload) => {
    try {
      await saveMessage(payload);
      console.log(payload);
      io.to(payload.to).emit("private-message", payload);
    } catch (error) {
      console.error("Error enviando mensaje privado:", error);
    }
  });

  // Crear o unirse a una sala
  client.on("join-room", (room) => {
    client.join(room);
    io.to(room).emit("room-message", { user: uid, message: `${uid} se ha unido a la sala ${room}` });
  });

  // Salir de una sala
  client.on("leave-room", (room) => {
    client.leave(room);
    io.to(room).emit("room-message", { user: uid, message: `${uid} ha salido de la sala ${room}` });
  });

  // Enviar mensajes a una sala
  client.on("room-message", async (payload) => {
    try {
      await saveMessage(payload);
      io.to(payload.room).emit("room-message", payload);
    } catch (error) {
      console.error("Error enviando mensaje a sala:", error);
    }
  });

  // Enviar imágenes y documentos
  client.on("file-upload", async (payload) => {
    try {
      // Aquí podrías guardar el archivo en el servidor o un servicio de almacenamiento
      console.log("Archivo recibido:", payload);

      if (payload.to) {
        io.to(payload.to).emit("file-upload", payload);
      } else if (payload.room) {
        io.to(payload.room).emit("file-upload", payload);
      }
    } catch (error) {
      console.error("Error enviando archivo:", error);
    }
  });

  client.on("disconnect", () => {
    disconnectedUser(uid);
  });
});
