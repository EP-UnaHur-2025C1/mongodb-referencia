const mongoose = require('mongoose')

const libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'Titulo es requerido']
    },
    fechaPublicacion: {
        type: Date,
        required: [true, 'Fecha de publicación requerida']
    },
    genero: {
        type: String,
        required: [true, 'Genero es requerido']
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Autor',
        required: true
    }
}, { strict: false })

module.exports = mongoose.model('Libro', libroSchema)
