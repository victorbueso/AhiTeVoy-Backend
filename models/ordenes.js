const { Schema, model } = require('mongoose');

const SchemaOrdenes = new Schema({
    destino: {
        type: String,
        required: true
    },
    destinoMapa: {
        type: Array,
        required: true
    },
    pedido: {
        type: Array,
        required: true
    },
    cliente: {
        type: String,
        required: true
    },
    statusOrden: {
        type: Number,
        required: true
    },
    tomada: {
        type: Boolean,
        required: true
    },
    entregada: {
        type: Boolean,
        required: true
    },
    rtnFactura: {
        type: String,
        required: true
    },
    local: {
        type: String,
        required: true
    },
})

module.exports = model('ordenes', SchemaOrdenes)