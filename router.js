var fs = require('fs');

module.exports.router = function (req, res) {
  if (req.url == "/") {
    staticResponse("public/index.html", res);
  } else if (req.url == "/favicon.ico") {
    console.log("favicon!!!");
    res.end();
  } else {
    var reqUrl = req.url.slice(1);

    staticResponse(reqUrl, res);

  }
  
}

var staticResponse = function (filename, res) {
  fs.readFile(filename, {encoding: "utf-8"}, function (err, data) {
    if (err) {
      res.write("404 Error");
      res.end();
    } 
    else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    }
  });
}