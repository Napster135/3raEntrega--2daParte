const socketIO = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let userN = null;

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  if (userN == null) {
    socket.emit('welcome', 'Ingresa tu usuario');
    socket.on('newUser', (username) => {
      userN = username;
      io.emit('chat', `${userN} se ha unido al chat`);
    });
  }

  socket.on('message', (msg) => {
    io.emit('chat', { user: userN, message: msg });
  });

  socket.on('disconnect', () => {
    io.emit('chat', `${userN} ha dejado el chat`);
    userN = null;
  });
});

server.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
