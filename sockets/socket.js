const { desconectar, mensaje, confUsuario } = require('./ordenes');
const { io } = require('../index');

io.on('connection', (cliente, io) => {

    //Extraemos el id unico del cliente
    const idHandShake = cliente.id;
    
    //Extraemos el nombre de la sala
    const nameRoom  = 'Motoristas-salas';

    //Conectamos cliente al sala.
    cliente.join(nameRoom);
 
    //Configurar usuario conectado
    cliente.on('configurar-usuario', confUsuario) 

    console.log(`Hola dipositivo: ${idHandShake} se unio a la sala ${nameRoom}`);
    //Desconectar
    cliente.on('disconnect', desconectar);

    //Con esto escuchamos las emisiones ordenes del cliente.
    cliente.on('ordenes', mensaje );
    
})

io.emit('connection'); 