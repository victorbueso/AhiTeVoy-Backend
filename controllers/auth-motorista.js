const { response } = require('express');
const { validationResult } = require('express-validator');

const crearUsuario = ( req, res = response ) =>{

    const { name, lastName, phone, email, password, registerDate , status } = req.body;

    const errors = validationResult( req );
    
    if ( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        })
    }

    console.log( );
        return res.json(
            {
                ok: true,
                msg: 'Nuevo usuarios',
            }
        );
}

const loginUsuario = ( req, res = response ) => {

    const errors = validationResult( req );
    
    if ( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        })
    }
    
    const { email, password } = req.body;
    console.log( email, password )
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
    crearUsuario,
    loginUsuario,
    revalidarToken,
}