const cliente = require('../models/cliente');
const { generarJWT } = require('../helpers/jwt-client');

const revalidarToken = async (req, res ) => {
    const { uid } = req;

    const user = await cliente.findById(uid);

    const token = await generarJWT(uid);
    return res.json({ ok: true, token, uid, 'correo': user.correo });
}

module.exports = { revalidarToken };