url = require('url');
fs = require('fs');

var options;

var http = require('http');
http.createServer(options, function (req, res) {
    getFile(req, res);
}).listen(8081);

var getFile = function (req, res) {

    var path = url.parse(req.url).pathname;
    path = path != '/' ? '.' + path : 'index.html';

    fs.readFile(path,
        function(err, data) {
            if(err) {res.end("<h1 align='center'>I am sorry. File Not Found.</h1>");}
            res.end(data);
    });
};

console.log('Server running at localhost:8080');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});