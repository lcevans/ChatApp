var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var chatServer = require('./lib/chat_server.js');

var router = require('./router.js');


var server = http.createServer(function (req, res) {

  router.router(req,res);
  
}).listen(8080);

chatServer.createChat(server);
