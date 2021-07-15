const { Router } = require('express');
const { crearUsuario } = require('../controllers/auth-motorista');
const { loginUsuario } = require('../controllers/auth-motorista');
const { revalidarToken } = require('../controllers/auth-motorista');

const router = Router();

router.post('/new', crearUsuario);

router.post('/login', loginUsuario);

/* Validar token */
router.get('/renew', revalidarToken);


module.exports = router;