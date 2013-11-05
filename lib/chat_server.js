var socket = require('socket.io')


module.exports.createChat = function (server) {
  var io = socket.listen(server);

  var guestnumber = 0;
  var nicknames = {};

  io.sockets.on('connection', function (socket) {
    guestnumber++;
    nicknames["User " + guestnumber] = true;
    socket.emit('initial-message', { 
      text: "You have joined the room as guest number " + guestnumber + ". Welcome",
      userName: "User " + guestnumber,
      nicknames: nicknames
    });

    socket.on('send-message', function(data){
      io.sockets.emit('send-message', { message: data.message});
    });

    socket.on('nicknameChangeRequest', function(data){
      console.log(nicknames[data.newName]);
      if (nicknames[data.newName]) {
        console.log("here");
        io.sockets.emit('nicknameChangeResult', {changed: false});
      }
      else {
        console.log("there");
        nicknames[data.oldName] = false;
        nicknames[data.newName] = true;
        io.sockets.emit('nicknameChangeResult', {
          changed: true,
          newName: data.newName,
          oldName: data.oldName,
          nicknames: nicknames
        });
      }
    });

  });
}