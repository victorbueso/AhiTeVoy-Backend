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
    Motorista.aggregate(
        [   {$match: {_id : mongoose.Types.ObjectId(req.params.idUsuario)}},
            {$unwind: '$ordenes'},
            {$match: {'ordenes.entregada': false, "ordenes.tomada": true}},
            {$group: {_id: '$_id', ordenes: {$push : '$ordenes'}}}]
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
    Motorista.aggregate(
    [    {$match: {_id : mongoose.Types.ObjectId(req.params.idUsuario)}},
        {$unwind: '$ordenes'},
        {$match: {'ordenes.entregada': true}},
        {$group: {_id: '$_id', ordenes: {$push : '$ordenes'}}}]
    ).then( result =>{
        res.send(result);
        res.end();
    }).catch( error =>{
        res.send(error);
        res.end();
    });
});


//Servicio para obtener los usuarios aprobados
router.get('/aprobado', ( req, res ) =>{
    Motorista.find({status: true})
    .then( result =>{
        res.send(result);
        res.end();
    }).catch( error =>{
        res.send(error);
        res.send();
    })
});

//Servicio para obtener los usuarios sin aprobar.
router.get('/sinaprobar', ( req, res ) =>{
    Motorista.find({status: false})
    .then( result =>{
        res.send(result);
        res.end();
    }).catch( error =>{
        res.send(error);
        res.send();
    })
});


//Servicio para aprobar un usuario
router.get('/aprobar/:idUsuario', ( req, res ) =>{
    Motorista.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idUsuario),
        }, 
        {
            $set: {
                "status": true
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


module.exports = router;