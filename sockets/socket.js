const { desconectar, mensaje, confUsuario, direccionMotorista, moverMotorista } = require('./ordenes');
const { io } = require('../index');

io.on('connection', (cliente, io) => {

    //Extraemos el id unico del cliente
    const idHandShake = cliente.id;
    
    //Extraemos el nombre de la sala
    const nameRoom  = cliente.handshake.payload;

    //Conectamos cliente al sala.
    

    cliente.on('ordenes-conectar', (payload) =>{
        cliente.join(payload);
        this.nameRoom = payload;
        console.log(`Hola dipositivo: ${idHandShake} se unio a la sala ${this.nameRoom}`);
    }) ;

    //Enviar direccion en tiempo real motorista.
    cliente.on('enviar-dir-motorista', direccionMotorista);

    //Mover direccion del motorista en tiempo real.
    cliente.on('mover-dir-motorista', moverMotorista);
    
    //Configurar usuario conectado
    cliente.on('configurar-usuario', confUsuario) 

    //Desconectar
    cliente.on('disconnect', desconectar);

    //Con esto escuchamos las emisiones ordenes del cliente.
    cliente.on('ordenes', mensaje );
    
})

io.emit('connection'); 