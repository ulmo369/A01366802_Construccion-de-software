const http = require('http');
const archivo = require('./routes');

const server = http.createServer(archivo);

server.listen(3000);