const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {
    const token = req.header('x-token');
    if( !token  ) {
        return res.status(401).json({
            ok: false,
            msg: 'error en el token'
        });
    }

    try {
        const { uid } = jwt.verify( token, 'secretkey' );
        req.uid  = uid;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    // TODO OK!
    next();
};

module.exports = { validarJWT };