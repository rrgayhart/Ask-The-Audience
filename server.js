const http = require('http');
const express = require('express');

const app = express();

var votes = {};

function countVotes(votes){
  var voteCount = {
    A: 0,
    B: 0,
    C: 0,
    D: 0
  };

  for (var vote in votes) {
    voteCount[votes[vote]]++
  }
  return voteCount;
};

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

var port = process.env.PORT || 3000;

var server = http.createServer(app)

const socketIo = require('socket.io');
const io = socketIo(server);

server.listen(port, function(){
  console.log('Listening on port ' + port + '.');
});

io.on('connection', function(socket){
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected.');

  socket.on('disconnect', function(){
    delete votes[socket.id];
    socket.emit('voteCount', countVotes(votes));
    io.sockets.emit('userConnection', io.engine.clientsCount);
  });

  socket.on('message', function (channel, message) {
    if (channel === 'voteCast'){
      votes[socket.id] = message;
      socket.emit('voteCount', countVotes(votes));
    }
  });
});


module.exports = server;
