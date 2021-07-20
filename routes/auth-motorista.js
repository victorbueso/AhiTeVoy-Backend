const { Router } = require('express');
const { check } = require('express-validator');
const { crearMotorista } = require('../controllers/auth-motorista');
const { loginMotorista } = require('../controllers/auth-motorista');
const { revalidarToken } = require('../controllers/auth-motorista');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt-motorista');

const router = Router();

router.post('/new', [
    check('name', 'El email es obligatorio').not().isEmpty(),
    check('lastName', 'El password es obligatorio').not().isEmpty(),
    check('phone', 'El password es obligatorio').isNumeric(),
    check('email', 'El password es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('registerDate', 'El password es obligatorio').isDate(),
    check('status', 'El password es obligatorio').isBoolean(),
    validarCampos
], crearMotorista);

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ max:10 }),
    validarCampos
], loginMotorista);

/* Validar token */
router.get('/renew', validarJWT, revalidarToken);


module.exports = router;