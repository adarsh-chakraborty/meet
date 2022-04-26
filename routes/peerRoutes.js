const { ExpressPeerServer } = require('peer');

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/'
});

peerServer.on('connection', (client) => {
  console.log('A new client joined!');
});
peerServer.on('disconnect', (client) => {
  console.log('Someone disconnected!');
});

module.exports = peerServer;
