const path = require('path');
const express = require('express');
const app = express();


const SocketIO = require('socket.io');



// Settings
app.set('port', process.env.PORT || 3001);


//static fields 

app.use(express.static(path.join(__dirname, 'public')))


// start on server
const server = app.listen(app.get('port'), () => {
    console.log("Running on: " +app.get('port'))
})

const io = SocketIO(server);

// web sockets 
io.on('connection', (socket) => {
    console.log('new connection: ', socket.id);

    socket.on('mimensaje', (data) => {
        console.log(data);
        io.sockets.emit('mensajeServidor', data);
    });

    socket.on('chat:typing', (data)=> {
        // console.log(data);   
        socket.broadcast.emit('chat:typing', data);
    });


});

