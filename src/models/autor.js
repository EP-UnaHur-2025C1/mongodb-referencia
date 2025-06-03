const mongoose = require('mongoose')

const autorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minlength: [2, 'Nombre debe tener al menos 2 caracteres']
    },
    nacionalidad: {
        type: String,
        required: true
    }
}, { strict: false })

module.exports = mongoose.model('Autor', autorSchema)