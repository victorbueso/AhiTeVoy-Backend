const { Router } = require('express');
const Motorista = require('../models/motorista');
const mongoose = require('mongoose');

const router = Router();

//Servicio para tomar una orden disponible
router.post('/add/:idUsuario', ( req, res ) => {
    Motorista.updateOne(
        {
            _id: mongoose.Types.ObjectId(req.params.idUsuario),
        }, 
        {
            $push: {
                ordenes: {
                    _id: mongoose.Types.ObjectId(req.body._id),
                    destino: req.body.destino,
                    destinoMapa: req.body.destinoMapa,
                    pedido: req.body.pedido,
                    cliente: req.body.cliente,
                    statusOrden: 0,
                    tomada: true,
                    entregada: false,
                    rtnFactura: mongoose.Types.ObjectId(req.body._id),
                    local: req.body.local,
                }
            }
        },
    ).then( result =>{
        res.send(result);
        res.end();
    }).catch( error =>{
        res.send(error);
        res.end();
    });
});


//Servicio para actualizar a entregada en el motorista
router.post('/terminarEntrega/:idUsuario', ( req, res ) => {
    Motorista.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idUsuario),
            "ordenes._id": mongoose.Types.ObjectId(req.body.idOrden)
        }, 
        {
            $set: {
                "ordenes.$.entregada": true
            }
        },
    ).then( result =>{
        res.send(result);
        res.end();
    }).catch( error =>{
        res.send(error);
        res.end();
    });
});


//Servicio para ordenes disponibles
router.get('/pendientes/:idUsuario', ( req, res ) => {
    Motorista.find(
        { _id: mongoose.Types.ObjectId(req.params.idUsuario), 
        "ordenes.entregada": false},
        {"ordenes": true}
    ).then( result =>{
        res.send(result);
        res.end();
    }).catch( error =>{
        res.send(error);
        res.end();
    });
});

//Servicio para ordenes disponibles
router.get('/entregadas/:idUsuario', ( req, res ) => {
    Motorista.find(
        { _id: mongoose.Types.ObjectId(req.params.idUsuario), 
        "ordenes.entregada": true},
        {"ordenes.$": true}
    ).then( result =>{
        res.send(result);
        res.end();
    }).catch( error =>{
        res.send(error);
        res.end();
    });
});


module.exports = router;