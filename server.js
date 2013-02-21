var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8082);
io.sockets.on('connection', function (socket) {
  socket.on('crossword:letterchange', function (letter) {
    socket.broadcast.emit('crossword:letterchange', letter);
  });
});