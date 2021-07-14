const { Schema, model, SchemaTypes } = require('mongoose');

let schema = Schema({
    nombre: String,
    apellido: String,
    correo: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    telefono: String,
    direccion: SchemaTypes.Mixed,          //{Ciudad: String, departamento: String, descripcion: String}
    tarjetaCredito: SchemaTypes.Mixed,     //{numeroTarjeta: String, caducidad: Date, cvv: Number}
    fechaNacimiento: String,
    fechaRegistro: String,
    fotoPerfil: String,
    genero: Number,
    verified: Boolean,
});

module.exports = model('cliente', schema);