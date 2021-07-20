const { response } = require('express');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const loginAdmin = async ( req, res = response ) => {
    
    const { email, password } = req.body;

    try {
        
        const dbUser = await Admin.findOne({ email });
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
            lastName: dbUser.lastName,
            status: dbUser.status,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}

const revalidarToken = async ( req, res = response ) => {

    const { uid } = req;
    const token = await generarJWT( uid );
    return res.json({
            ok: true,
            msg: 'Renew',
            uid,
            token
    });
}


module.exports = {
    loginAdmin,
    revalidarToken,
}