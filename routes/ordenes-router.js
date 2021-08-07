const { Router } = require('express');
const Ordenes = require('../models/ordenes');

const router = Router();

//Servicio para ordenes disponibles
router.get('/all', ( req, res ) => {
    Ordenes.find({"tomada": false}).then( result =>{
        res.send(result);
        res.end();
    }).catch( error =>{
        res.send(error);
        res.end();
    });
});

//Servicio para obtener detalles de una orden.
router.get('/:idOrden', ( req, res ) => {
    Ordenes.findById({_id: req.params.idOrden}).then( result =>{
        res.send(result);
        res.end();
    }).catch( error =>{
        res.send(error);
        res.end();
    });
});

//Servicio para modificar orden obtenida
router.post('/:idOrden', ( req, res ) => {
    Ordenes.updateOne(
        {
            _id: req.params.idOrden
        },
        { 
            $set: { 
                tomada: true
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