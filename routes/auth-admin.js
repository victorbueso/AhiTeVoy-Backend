const { Router } = require('express');
const { check } = require('express-validator');
const { crearMotorista } = require('../controllers/auth-motorista');
const { loginMotorista } = require('../controllers/auth-motorista');
const { revalidarToken } = require('../controllers/auth-motorista');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt-motorista');


