const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const uuid = require("uuid");
const categoria = require('../models/categoria');

//Crear una nueva categoria
router.post('/', (req, res) => {
    let categoriesRouter = new categoria({
        nombre: req.body.nombre,
        imagen: req.body.imagen
    });

    categoriesRouter.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener todas las categorias
router.get('/', (req, res) => {
    categoria.find().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener una categoria
router.get('/:id', (req, res) => {
    categoria.find({ _id: req.params.id }).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Eliminar una categoria
router.delete('/:id', function(req, res) {
    categoria.remove({
        _id: req.params.id
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

let storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
});

let upload = multer({ storage });

module.exports = router;