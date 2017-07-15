import { Launchpad } from "./launchpad";
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const launchpad = new Launchpad(io);

launchpad.set(4, 1, 21);
launchpad.listen(4, 1, "yes");
launchpad.set(5, 1, 5);
launchpad.listen(5, 1, "no");

launchpad.set(4, 2, 45);
launchpad.listen(4, 2, "ding");
launchpad.set(5, 2, 13);
launchpad.listen(5, 2, "bell");

launchpad.set(2, 1, 45);
launchpad.set(7, 1, 45);
launchpad.set(2, 2, 57);
launchpad.set(7, 2, 57);
launchpad.set(2, 3, 13);
launchpad.set(7, 3, 13);


app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit("sound", "ding");
});

