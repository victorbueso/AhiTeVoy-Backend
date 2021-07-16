const { response } = require('express');
const Motorista = require('../models/motorista');

const crearMotorista = async ( req, res = response ) =>{

    const { name, lastName, phone, email, password, registerDate , status } = req.body;

    try {
    //Verificar email
    let usuario = await Motorista.findOne({ email: email });
    if ( usuario ) {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe con ese email.'
        });
    }

    //Crear usuario con el modelo.
    motorista = new Motorista( req.body );

    //Hashear contrasenia


    //Generar JWT

    //Crear usuario de BD
    motorista.save();

    //Generar respuesta
    return res.status(201).json({
        ok: true,
        uid: motorista.id,
        name,
    });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                ok: false,
                msg: 'Por favor hable con admin.',
            }
        );
    }
}

const loginMotorista = ( req, res = response ) => {
    
    const { email, password } = req.body;
    return res.json(
        {
            ok: true,
            msg: 'Login de usuario'
        }
    );
}

const revalidarToken = ( req, res = response ) => {
    return res.json(
        {
            ok: true,
            msg: 'Renew'
        }
    );
}


module.exports = {
    crearMotorista,
    loginMotorista,
    revalidarToken,
}