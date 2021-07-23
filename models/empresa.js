const { Schema, model, SchemaTypes } = require('mongoose');

let schema = Schema({
    nombreEmpresa: {type: String, require: true, unique: true},
    codigoEmpresa: {type: String, require: true, unique: true},
    fechaCreacion: String,
    direccion: String,
    calificacion: Number,
    correo: String,
    codigoCategoria: String,
    descripcion: String,
    horario: String,
    logo: String,
});

module.exports = model('empresa', schema);