const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Web server is running fine.');
});

io.on('connection', (socket) => {
  // emit me, that I joined.
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    // forwarding the data we received.
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  socket.on('answerCall', (data) => {
    // forwarding the data we received.
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

server.listen(PORT, () => {
  console.log('Server is listening on PORT:', PORT);
});
