const { Schema, model } = require('mongoose');

const MotoristaSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registerDate: {
        type: Date,
    },
    status: {
        type: Boolean,
        required: true,
    },
    ordenes: {
        type: Array
    }
});

module.exports = model('Motoristas', MotoristaSchema );