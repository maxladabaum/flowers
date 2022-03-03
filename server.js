
var express = require('express');

var app = express();
var server = app.listen(process.env.PORT || 3000);

app.use(express.static('public'));

console.log("dis shit working jessie?");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection: ' + socket.id);

    socket.on('click', clickMsg);

    function clickMsg(data) {
        socket.broadcast.emit('click', data);
        console.log(data);
    }
}