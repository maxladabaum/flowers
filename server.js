// this website uses express, a node application framework
var express = require('express');

var app = express();

// tells the server to listen to Heroku webhost or port 3000 if Heroku is not available.
var server = app.listen(process.env.PORT || 3000);

app.use(express.static('public'));

console.log("working...");

// this website uses socket, a library that helps facilitate web clients and servers.
var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {

    console.log('new connection: ' + socket.id);

    // when a new connection is made, the following functions become available
    socket.on('click', clickMsg);

    function clickMsg(data) {
        socket.broadcast.emit('click', data);
        console.log(data);
    }

    socket.on('requestSync', clickMsg2);

    function clickMsg2(data) {
        socket.broadcast.emit('requestSync', data);
        console.log(data);
    }

    socket.on('sentSync', clickMsg3);

    function clickMsg3(data) {
        socket.broadcast.emit('sentSync', data);
        console.log(data);
    }
}