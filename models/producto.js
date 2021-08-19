const { Schema, model, SchemaTypes } = require('mongoose');

let schema = Schema({
    nombreProducto: {type: String, require: true, unique: true},
    codigoProducto: {type: String, require: true, unique: true},
    descripcionProducto: String,
    disponible: Number,
    codigoEmpProd: String,
    imagen: String,
    precio: Number,
});

module.exports = model('producto', schema);