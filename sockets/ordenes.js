const { io } = require('../index')
const Ordenes = require('../models/ordenes')

//Aqui quitaremos a lo usuarios que se desconecten.
const desconectar = async ( req ) =>{
    console.log('Usuario desconectado. NODE.')
} 

//Escuchamos las peticiones
const mensaje = async ( payload ) =>{
    console.log('TU ORDEN');
    let ordenes = await Ordenes.find({"tomada": false});

    io.to('motorista-ordenes').emit('orden-tomada', ordenes);
}

//Escuchamos las peticiones
const confUsuario = async ( payload ) =>{
    //Aqui agregamos a los usuarios conectados.
    console.log('Configurando usuario', payload);
    io.emit('user-configurado', payload);
}

const direccionMotorista = async ( payload ) =>{

}


const moverMotorista = async ( payload ) =>{
    let coordenadas = {
        lng: payload.lng,
        lat: payload.lat
    }
    io.emit(' ')
}

module.exports = {
    desconectar,
    mensaje,
    confUsuario,
    direccionMotorista,
    moverMotorista
};