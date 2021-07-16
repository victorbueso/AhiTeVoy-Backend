const cliente = require('../models/cliente');
const { generarJWT } = require('../helpers/jwt-client');

const revalidarToken = async (req, res ) => {
    const { uid } = req;

    const token = await generarJWT(uid);
    return res.status(401).json({ token, uid });
}

module.exports = { revalidarToken };