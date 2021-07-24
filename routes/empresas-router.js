const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const uuid = require("uuid");
const empresa = require('../models/empresa');

let storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
});

let upload = multer({ storage });

//Crear una nueva empresa
router.post('/', upload.single('image'), async (req, res) => {
    let empresasRouter = new empresa({
        nombreEmpresa: req.body.nombreEmpresa,
        codigoEmpresa: req.body.codigoEmpresa,
        fechaCreacion: req.body.fechaCreacion,
        direccion: req.body.direccion,
        calificacion: req.body.calificacion,
        correo: req.body.correo,
        codigoCategoria: req.body.codigoCategoria,
        descripcion: req.body.descripcion,
        horario: req.body.horario,
        logo: req.file.path,
    });

    empresasRouter.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener una empresa
router.get('/:id', (req, res) => {
    empresas.find({ _id: req.params.id }).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener todas las empresas
router.get('/', function(req, res) {
    empresas.find().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Actualizar una empresa
router.put('update/:idPost', function(req, res){
    empresas.updateOne({
        _id: req.params.id
    },
    {
        nombreEmpresa: req.body.nombreEmpresa,
        codigoEmpresa: req.body.codigoEmpresa,
        fechaCreacion: req.body.fechaCreacion,
        direccion: req.body.direccion,
        calificacion: req.bodycalificacion,
        correo: req.body.correo,
        codigoCategoria: req.body.codigoCategoria,
        descripcion: req.body.descripcion,
        horario: req.body.horario,
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error =>{
        res.send(error);
        res.end();
    });
});

//Eliminar una empresa
router.delete('/:id', function(req, res) {
    empresas.remove({
        _id: req.params.id
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});


module.exports = router;