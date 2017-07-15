import { Launchpad } from "./launchpad";
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const launchpad = new Launchpad(io);

launchpad.set(1, 1, 21);
launchpad.listen(1, 1, "yes_left");
launchpad.set(2, 1, 21);
launchpad.listen(2, 1, "yes_center");
launchpad.set(3, 1, 21);
launchpad.listen(3, 1, "yes_right");

launchpad.set(1, 2, 5);
launchpad.listen(1, 2, "no_left");
launchpad.set(2, 2, 5);
launchpad.listen(2, 2, "no_center");
launchpad.set(3, 2, 5);
launchpad.listen(3, 2, "no_right");

launchpad.set(1, 3, 45);
launchpad.listen(1, 3, "bell_left");
launchpad.set(2, 3, 45);
launchpad.listen(2, 3, "bell_center");
launchpad.set(3, 3, 45);
launchpad.listen(3, 3, "bell_right");

launchpad.set(1, 4, 57);
launchpad.listen(1, 4, "ding_left");
launchpad.set(2, 4, 57);
launchpad.listen(2, 4, "ding_center");
launchpad.set(3, 4, 57);
launchpad.listen(3, 4, "ding_right");


app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

io.on('connection', socket => {
  console.log("Connection from: " + socket.handshake.address);
  socket.emit("sound", "ding_center");
  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.handshake.address)
  });
});

