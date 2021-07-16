const { response } = require('express');
const Motorista = require('../models/motorista');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearMotorista = async ( req, res = response ) => {

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
        const salt = bcrypt.genSaltSync();
        motorista.password = bcrypt.hashSync( password, salt );
        //Generar JWT
        const token = await generarJWT( motorista.id );
        //Crear usuario de BD
        motorista.save();
        //Generar respuesta
        return res.status(201).json({
            ok: true,
            uid: motorista.id,
            name,
            token
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

const loginMotorista = async ( req, res = response ) => {
    
    const { email, password } = req.body;

    try {
        
        const dbUser = await Motorista.findOne({ email });
        if ( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no son validas.'
            });
        }

        const validPassword = bcrypt.compareSync( password, dbUser.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no son validas.'
            });
        }

        //Generar JWT
        const token = await generarJWT( dbUser.id );

        //Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}

const revalidarToken = ( req, res = response ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token.'
        });
    }

    return res.json(
        {
            ok: true,
            msg: 'Renew',
            token
        }
    );
}


module.exports = {
    crearMotorista,
    loginMotorista,
    revalidarToken,
}