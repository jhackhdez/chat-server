const { io } = require("../index");
const { checkJWT } = require("../helpers/jwt");
const {connectedUser, disconnectedUser} = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) => {

  // Leemos headers del cliente Dart/flutter y desestructuramos 'valid' y 'uid' que viene desde /helpers/jwt
  const [valid, uid] = checkJWT(client.handshake.headers['x-token']);

  // Verificar autenticación
  if(!valid) {return client.disconnect();}

  // Cliente autenticado
  connectedUser(uid);

  client.on('disconnect', () => {
    disconnectedUser(uid);
  });

  // client.on('mensaje', ( payload ) => {
  //     console.log('Mensaje', payload);
  //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

  // });
});
