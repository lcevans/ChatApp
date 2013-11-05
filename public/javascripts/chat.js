(function(){
  var ChatLib = this.ChatLib = (this.ChatLib || {});

  var Chat = ChatLib.Chat = function(socket){
    this.socket = socket;
  };

  Chat.prototype.sendMessage = function(message) {
    this.socket.emit("send-message", { message: message });
  };

})(this);