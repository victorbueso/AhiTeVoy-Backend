const desconectar = require('./ordenes');
const { io } = require('../index');

io.on('connection', cliente => {
    console.log( 'Usuario conectado' );

    cliente.on('disconnect', desconectar);

})

io.emit('connection');