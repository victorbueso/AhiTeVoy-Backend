const { Schema, model } = require('mongoose');

let schema = Schema({
    nombre: String,
    imagen: String,
});

module.exports = model('categoria', schema);