const express = require('express');
const http = require('http');
const cors = require('cors');
const { ExpressPeerServer } = require('peer');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.get('/', (req, res, next) => res.send('Hello world!'));

const server = http.createServer(app);
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

app.use('/api', peerServer);

server.listen(PORT, () => {
  console.log('Server is listening on PORT: ', PORT);
});
