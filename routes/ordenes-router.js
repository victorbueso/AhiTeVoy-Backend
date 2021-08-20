const { Router } = require('express');
const Ordenes = require('../models/ordenes');

const router = Router();

//Servicio para crear una nueva orden enviada desde el cliente
router.post('/', (req, res) => {
    let ordenesRouter = new Ordenes({
        cliente: req.body.cliente,
        pedido: req.body.pedido,
        destinoMapa: req.body.destinoMapa,
        statusOrden: req.body.statusOrden,
        tomada: req.body.tomada,
        entregada: req.body.entregada,
        descripcion: req.body.descripcion,
    })
    ordenesRouter.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

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


//Servicio para hacer como entregada la orden
router.post('/entregada/:idOrden', ( req, res ) => {
    Ordenes.updateOne(
        {
            _id: req.params.idOrden
        },
        { 
            $set: { 
                entregada: true
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


//Servicio para ver el historial.
router.get('/historial/$:id', async ( req, res ) => {
    Ordenes.find().then( result =>{
        res.send(result);
        res.end();
    }).catch( error =>{
        res.send(error);
        res.end();
    });
});


//Servicio para actualizar el estado de la orden.
router.post('/status/:idOrden', ( req, res ) => {
    Ordenes.updateOne(
        {
            _id: req.params.idOrden
        },
        { 
            $set: { 
                statusOrden: req.body.estadoOrden
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