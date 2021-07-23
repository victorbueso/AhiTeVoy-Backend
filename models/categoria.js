const { Schema, model } = require('mongoose');

let schema = Schema({
    nombre: {type: String, require: true, unique: true},
    codigoCategoria: {type: String, require: true, unique: true},
    imagen: String,
});

module.exports = model('categoria', schema);