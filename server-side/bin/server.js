/**
 * @file server.js
 * @class server
 * @namespace 'bin/'
 * @description **Ponto de entrada principal da aplicação web.**
 * Este arquivo inicia o servidor Node.js e configura o aplicativo Express.
 * Ele escuta conexões recebidas na porta especificada e lida com erros de forma 
 * elegante.
 * 
 * @author [GERSON ALVES DA SILVA]
 * @since [26/06/2024]
 */
'use strict';

const app = require('../src/app');
const debug = require('debug')('webappcortejav1:server');
const http = require('http');

const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
