const { desconectar, mensaje, confUsuario, direccionMotorista, moverMotorista, actualizarOrden } = require('./ordenes');
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

    //Con esto escuchamos las emisiones del motorista.
    cliente.on('ordenes', mensaje );

    //Conectamos al motorista y el cliente creando su sala por id de Orden.
    cliente.on('estado-conectar', (payload) =>{
        cliente.join(payload.nameRoom);
        console.log(`Tomaste la orden ${this.nameRoom}`);
    }) ;

    //Con esto escuchamos las emisiones del estado de la orden por motorista motorista y cliente
    //para esto emitiremos el id con lat y long.
    cliente.on('estado', actualizarOrden );

    //Enviar direccion en tiempo real motorista.
    cliente.on('marcador', direccionMotorista);

    //Mover direccion del motorista en tiempo real.
    cliente.on('mover-dir-motorista', moverMotorista);
    
    //Configurar usuario conectado.
    cliente.on('configurar-usuario', confUsuario) 

    //Desconectar
    cliente.on('disconnect', desconectar);
});

io.emit('connection'); 