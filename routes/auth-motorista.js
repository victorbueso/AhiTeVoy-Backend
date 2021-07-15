const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario } = require('../controllers/auth-motorista');
const { loginUsuario } = require('../controllers/auth-motorista');
const { revalidarToken } = require('../controllers/auth-motorista');

const router = Router();

router.post('/new', crearUsuario);

router.post('/login', [
    check()
] , loginUsuario);

/* Validar token */
router.get('/renew', revalidarToken);


module.exports = router;