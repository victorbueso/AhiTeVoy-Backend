const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario } = require('../controllers/auth-motorista');
const { loginUsuario } = require('../controllers/auth-motorista');
const { revalidarToken } = require('../controllers/auth-motorista');

const router = Router();

router.post('/new', [
    check('name', 'El email es obligatorio').not().isEmpty(),
    check('lastName', 'El password es obligatorio').not().isEmpty(),
    check('phone', 'El password es obligatorio').isNumeric(),
    check('email', 'El password es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('registerDate', 'El password es obligatorio').isDate(),
    check('status', 'El password es obligatorio').isBoolean(),
    
], crearUsuario);

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min:6 }),
], loginUsuario);

/* Validar token */
router.get('/renew', revalidarToken);


module.exports = router;