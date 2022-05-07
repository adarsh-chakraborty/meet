const express = require('express');
const http = require('http');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const { ExpressPeerServer } = require('peer');
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 9000;

const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use(cors());
app.use(homeRoutes);
app.use('/auth', authRoutes);
// other routes

const server = http.createServer(app);
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/'
});

const io = new Server(server);

peerServer.on('connection', (client) => {
  console.log('A new client joined!');
});
peerServer.on('disconnect', (client) => {
  console.log('Someone disconnected!');
});

app.use('/api', peerServer);

io.on('connection', (socket) => {
  console.log('[SOCKET.IO] A user connected');
});

server.listen(PORT, () => {
  console.log('Server is listening on PORT: ', PORT);
});
