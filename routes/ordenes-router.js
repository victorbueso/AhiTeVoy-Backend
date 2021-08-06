const { Router } = require('express');
const Ordenes = require('../models/ordenes');


const router = Router();

router.get('/all', ( req, res ) => {
    Ordenes.find().then( result =>{
        res.send(result);
        res.end();
    }).catch( error =>{
        res.send(error);
        res.end();
    });
});

router.get('/pendientes/$:id', ( req, res ) => {
    Ordenes.find().then( result =>{
        res.send(result);
        res.end();
    }).catch( error =>{
        res.send(error);
        res.end();
    });
});

router.get('/historial/$:id', async ( req, res ) => {
    Ordenes.find().then( result =>{
        res.send(result);
        res.end();
    }).catch( error =>{
        res.send(error);
        res.end();
    });
});

module.exports = router;