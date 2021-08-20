const { Schema, model } = require('mongoose');

const SchemaOrdenes = new Schema({
    destino: {
        type: String,
    },
    destinoMapa: {
        type: Schema.Types.Mixed,
        required: true
    },
    pedido: {
        type: Array,
        required: true
    },
    cliente: {
        type: String
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
    },
    local: {
        type: String,
    },
    descripcion: {
        type: String,
        required: true
    }
})

module.exports = model('ordenes', SchemaOrdenes)