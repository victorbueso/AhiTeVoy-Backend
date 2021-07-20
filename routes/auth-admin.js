const { Router } = require('express');
const { check } = require('express-validator');

const { loginAdmin } = require('../controllers/auth-admin');
const { revalidarToken } = require('../controllers/auth-admin');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt-motorista');

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ max:10 }),
    validarCampos
], loginAdmin);

/* Validar token */
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;