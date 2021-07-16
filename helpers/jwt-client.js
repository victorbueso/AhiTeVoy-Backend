const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {
    const payload = { uid };
    
    return new Promise( (resolve, reject) => {
        jwt.sign( payload, 'secretkey', {
            expiresIn: '24h'
        }, (err, token) => {
            if ( err ) {
                // TODO MAL
                console.log(err);
                reject(err);
            } else {
                // TODO BIEN
                resolve( token );
            }
        });
    });
};

module.exports = { generarJWT };