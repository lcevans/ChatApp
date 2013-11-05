$(document).ready(function(){

  var socket = io.connect("10.0.1.3:8080");

  var chat = new ChatLib.Chat(socket);

  var userName;

  socket.on('initial-message', function (data) {
    addMessageToDisplay(data.text);
    userName = data.userName;
    renderUserNames(data.nicknames);
    // for (name in data.nicknames) {
    //   var nameDiv = $('<div>').addClass("userlist-nameitem").attr("data-id", name).text(name);
    //   $('.users-list').append(nameDiv);
    // };
  });

  socket.on('send-message', function (data) {
    addMessageToDisplay(data.message);
  });

  socket.on('nicknameChangeResult', function (data) {
    if (data.changed) {
      userName = data.newName;
      addMessageToDisplay(data.oldName + " changed their name to " + userName);
      renderUserNames(data.nicknames);
    } else {
      addMessageToDisplay("Name already taken!");
    }
  });


  $('.new-message-form').on("submit", function(event){
    event.preventDefault();
    var messageText = getMessage();
    if (messageText.slice(0,6) == "/nick ") {
      var newName = messageText.slice(6);
      socket.emit("nicknameChangeRequest", {oldName: userName, newName: newName});
    }
    else {
      chat.sendMessage(userName + ": " + messageText);
    }
    $('.new-message-input').val("");
  });

  $('.new-message-input').keydown(function(event) {
    if (event.keyCode == 13) {
      // alert("you hit enter");
      $('.new-message-form').submit();
      return false;
     }
  });

});

var getMessage = function() {
  return $('.new-message-input').val();
};

// var sendMessageToOthers = function(message) {
//   ChatLib.Chat.sendMessage(message)
// };

var addMessageToDisplay = function(message) {
  var formattedMessage = $("<div>");
  formattedMessage.text(message);
  $('.message-readout').append(formattedMessage);
};

var renderUserNames = function (nicknames) {
  $('.userlist-nameitem').remove();
  for (name in nicknames) {
    if (nicknames[name]) {
      var nameDiv = $('<div>').addClass("userlist-nameitem").attr("data-id", name).text(name);
      $('.users-list').append(nameDiv);      
    }
  };
};







