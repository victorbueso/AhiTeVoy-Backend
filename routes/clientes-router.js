const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const cliente = require('../models/cliente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const uuid = require("uuid");
const { generarJWT } = require('../helpers/jwt-client');
const { revalidarToken } = require('../controllers/auth-client');
const { validarJWT } = require('../middlewares/validar-jwt-client');

let storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
});

let upload = multer({ storage });

//Crear un usuario cliente
router.post('/', async (req, res) => {
    const correo = req.body.correo;
    const hash = await bcrypt.hashSync(req.body.password, 10);
    const user = await cliente.findOne({'correo': correo});

    try {
        if (user != null)
            return res.status(401).json({ok: false, message: 'Correo en uso.'});
    
        let clientRouter = new cliente({
            nombre: '',
            apellido: '',
            correo: req.body.correo,
            password: hash,
            telefono: '',
            direccion: {},                  //{Ciudad: String, departamento: String, descripcion: String}
            tarjetaCredito: {},             //{numeroTarjeta: String, caducidad: Date, cvv: Number}
            fechaNacimiento: '',
            fechaRegistro: new Date(),
            fotoPerfil: '',
            genero: 1,                      //Masculino: 1, Femenino: 0
            verified: false,
        });

        const token = await generarJWT( clientRouter._id );
        await clientRouter.save();
        return res.status(201).json({ ok: true, token, 'idClient': clientRouter._id, 'correo': clientRouter.correo });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error 500: Se ha encontrado problemas en el servidor para guardar el usuario.'
        });
    }

    /*clientRouter.save().then(result => {
        //const token = jwt.sign({_id: clientRouter._id}, 'secretkey');
        //const token = generarJWT( clientRouter._id );
        //res.status(201).json({ token, 'idClient': clientRouter._id });
        //res.end();
    }).catch(error => {
        //res.send(error);
        //res.end();
    });*/
});

var idUsuario;
//Login client user
router.post('/signin', async (req, res) => {
    const correo = req.body.correo;
    const password = req.body.password;
    
    try {
        const user = await cliente.findOne({'correo': correo});
        if (user === null)
            return res.status(401).json({ok: false, message: 'No se encontró ningun usuario registrado con este correo electrónico.'});

        let contraseña = bcrypt.compareSync(password, user.password);
        if (!contraseña)
            return res.status(401).json({ok: false, message: 'Contraseña incorrecta.'});
    
        //const token = jwt.sign({ _id: user._id }, 'secretkey');
        const token = await generarJWT(user._id);
        idUsuario = user._id;
        return res.status(200).json({ok: true, token, 'idClient': user._id, 'correo': user.correo });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error 500: Se ha encontrado problemas en el servidor para iniciar sesión con el usuario.'
        });
    }
});

// Validar y revalidar token
router.get( '/renew', validarJWT, revalidarToken );

//Obtener un client user
router.get('/:idClient', function(req, res) {
    cliente.find({ _id: mongoose.Types.ObjectId(req.params.idClient) })
        .then(result => {
            res.send(result[0]);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
});

//Actualizar el perfil de un cliente
router.put('/:idCliente', upload.single('imagen'), (req, res) => {
    cliente.updateOne(
        {
            _id: mongoose.Types.ObjectId(req.params.idCliente)
        },
        {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            ciudad: req.body.ciudad,
            departamento: req.body.departamento,
            tarjetaCredito: req.body.tarjetaCredito,
            vencimientoTarjeta: req.body.vencimientoTarjeta,
            cvv: req.body.cvv,
            fotoPerfil: req.file.path
        })
        .then(result => {
            res.status(200).json({ 'message': 'Información del perfil actualizada con exito' });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
})

module.exports = router;

