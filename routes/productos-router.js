const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const uuid = require("uuid");
const producto = require('../models/producto');

let storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
});

let upload = multer({ storage });

//Crear una nueva empresa
router.post('/', upload.single('imagen'), async (req, res) => {
    let productosRouter = new producto({
        nombreProducto: req.body.nombreProducto,
        codigoProducto: req.body.codigoProducto,
        descripcionProducto: req.body.descripcionProducto,
        disponible: req.body.disponible,
        fragil: req.body.fragil,
        codigoEmpProd: req.body.codigoEmpProd,
        imagen: req.file.path,
    });

    productosRouter.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener un producto
router.get('/:id', (req, res) => {
    producto.find({ _id: req.params.id }).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener producto por empresa
router.get('/prods/:prodCod', (req, res) => {
    producto.find({ codigoEmpresa: req.params.prodCod })
        .then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
});

//Obtener todas los productos
router.get('/', function(req, res) {
    producto.find().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Actualizar un producto
router.put('update/:id', upload.single('imagen'), function(req, res){
    producto.updateOne({
        _id: req.params.id
    },
    {
        nombreProducto: req.body.nombreProducto,
        codigoProducto: req.body.codigoProducto,
        descripcionProducto: req.body.descripcionProducto,
        disponible: req.body.disponible,
        fragil: req.body.fragil,
        codigoEmpProd: req.body.codigoEmpProd,
        imagen: req.file.path,
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error =>{
        res.send(error);
        res.end();
    });
});

//Eliminar un producto
router.delete('/:id', function(req, res) {
    producto.remove({
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