const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const cliente = require('../models/cliente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Crear un usuario cliente
router.post('/', async (req, res) => {
    const correo = req.body.correo;
    const hash = await bcrypt.hashSync(req.body.password, 10);
    const user = await cliente.findOne({'correo': correo});

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

    clientRouter.save().then(result => {
        const token = jwt.sign({_id: clientRouter._id}, 'secretkey');
        res.status(200).json({ token, 'idClient': clientRouter._id });
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Login client user
router.post('/signin', async (req, res) => {
    const correo = req.body.correo;
    const password = req.body.password;
    const user = await cliente.findOne({'correo': correo});

    if (user === null)
        return res.status(401).json({ok: false, message: 'No se encontró ningun usuario registrado con este correo electrónico.'});

    let contraseña = bcrypt.compareSync(password, user.password);
    if (!contraseña)
        return res.status(401).json({ok: false, message: 'Contraseña incorrecta.'});

    const token = jwt.sign({ _id: user._id }, 'secretkey');
    return res.status(200).json({ token, 'idClient': user._id });
});

//Obtener un client user
router.get('/:idClient', function(req, res) {
    usuario.find({ _id: mongoose.Types.ObjectId(req.params.idClient) })
        .then(result => {
            res.send(result[0]);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
});

module.exports = router;

