var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8082);
io.sockets.on('connection', function (socket) {
  
  socket.on('join', function (crossword) {
    socket.join(crossword.id);
  });

  socket.on('crossword:letterchange', function (crosswordId, letter) {
    socket.broadcast.to(crosswordId).emit('crossword:letterchange', letter);
  });


});