var socket = io();

setUpButtonListeners()

socket.on('usersConnected', function(count){
  updateConnected(count);
});

socket.on('voteCount', function (votes){
  logVotes(votes);
});

function setUpButtonListeners(){
  var buttons = document.querySelectorAll('#choices button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      socket.send('voteCast', this.innerText);
    });
  };
};

function updateConnected(count){
  var connectionCount = document.getElementById('connection-count');
  connectionCount.innerText = 'Connected Users: ' + count;
};

function logVotes(votes){
  console.log(votes);
};
