// const express = require("express");
// const path = require("path");

// const app = express();
// const server = require("http").createServer(app);


// const io = require("socket.io")(server);

// app.use(express.static(path.join(__dirname+"/public")));

// io.on("connection", function(socket){
//     socket.on("newuser",function(username){
//         socket.broadcast.emit("update", username + " joined the conversation");
//     });
//     socket.on("exituser",function(username){
//         socket.broadcast.emit("update", username + " left the conversation");
//     });
//     socket.on("chat",function(message){
//         socket.broadcast.emit("chat", message);
//     });
// })

// server.listen(5000);
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
