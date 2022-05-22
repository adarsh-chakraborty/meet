if (!process.env.HEROKU) {
  console.log('Develop Environment setting up...');
  require('dotenv').config();
}
const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const { ExpressPeerServer } = require('peer');
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 9000;

const homeRoutes = require('./routes/homeRoutes');
const authRoutes = require('./routes/authRoutes');

const { verifyAccessToken } = require('./util/auth');

const User = require('./model/User');
const onlineUsers = require('./util/onlineUsers');

app.use(express.json());
app.use(cookieParser(process.env.SIGN_COOKIE_SECRET));
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

peerServer.on('connection', async (client) => {
  console.log('A new client joined!');
  const decoded = verifyAccessToken(client.token);
  if (!decoded) {
    console.log('AUTH FAILED', decoded);
    return client.socket.close();
  }
  onlineUsers[client.id] = decoded.userId;
  await User.findByIdAndUpdate(decoded.userId, { peerId: client.id });
  console.log(onlineUsers);
});

peerServer.on('disconnect', async (client) => {
  console.log('Someone disconnected!');
  // which user disconnect ?
  const userId = onlineUsers[client.id];
  delete onlineUsers[client.id];
  await User.findByIdAndUpdate(userId, { peerId: null });
  console.log(onlineUsers);
});

app.use('/api', peerServer);

io.on('connection', (socket) => {
  console.log('[SOCKET.IO] A user connected');
});

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    console.log('Error connecting to mongodb');
    return;
  }
  server.listen(PORT, () => {
    console.log('Server is listening on PORT: ', PORT);
  });
});
