const { io } = require("../index");
const { checkJWT } = require("../helpers/jwt");
const { connectedUser, disconnectedUser } = require("../controllers/socket");

// Mensajes de Sockets
io.on("connection", (client) => {
  // Leemos headers del cliente Dart/flutter y desestructuramos 'valid' y 'uid' que viene desde /helpers/jwt
  const [valid, uid] = checkJWT(client.handshake.headers["x-token"]);

  // Verificar autenticación
  if (!valid) {
    return client.disconnect();
  }

  // Cliente autenticado
  connectedUser(uid);

  // Ingresar al usuario a una sala específica
  // Hay 2 salas: Sala global y Sala privada. Acá se define cómo unir una persona a una sala privada utilizando: clien.id [id del user]
  // uid: sería el nombre de la sala
  client.join(uid);

  // Escuchar del cliente el 'personal-msg'
  client.on('personal-msg', (payload) => {
    console.log(payload);
  });

  client.on("disconnect", () => {
    disconnectedUser(uid);
  });

  // client.on('mensaje', ( payload ) => {
  //     console.log('Mensaje', payload);
  //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

  // });
});
