// Creating Server
const PORT = process.env.PORT || "3010";
const http = require('http');
const app = require('./app')
const server = http.createServer(app)
const socket = require("socket.io");
const io = socket(server);
var db = require('./db')


// server.listen();
io.on('connection', function (socket) {
    socket.on('join', function (data) {
        socket.join(data.roomId);
        socket.room = data.roomId;
        const sockets = io.of('/').in().adapter.rooms[data.roomId];
        if (sockets.length === 1) {
            socket.emit('init')
        } else {
            if (sockets.length === 2) {
                io.to(data.roomId).emit('ready')
            } else {
                socket.room = null
                socket.leave(data.roomId)
                socket.emit('full')
            }

        }
    });
    socket.on('signal', (data) => {
        io.to(data.room).emit('desc', data.desc)
    })
    socket.on('disconnect', () => {
        const roomId = Object.keys(socket.adapter.rooms)[0]
        if (socket.room) {
            io.to(socket.room).emit('disconnected')
        }

    })
});







server.listen(PORT,() => {console.log('Server connected at PORT 3010')})