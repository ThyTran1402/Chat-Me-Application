const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http); 
const path = require('path');

//Serve the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, +'public/index.html'));
});

io.on('connection', socket => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.io('message', (message) => {
        console.log('message', message);
        //Broadcase the message to everyone!
        socket.emit('message', message);
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});