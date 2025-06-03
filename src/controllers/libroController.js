const Libro = require('../models/libro')

const obtenerLibros = async (req, res) => {
    try {
        const libros = await Libro.find()
            .select('titulo fechaPublicacion genero -_id')
            .populate('autor', 'nombre nacionalidad -_id')
        res.status(200).json(libros)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const obtenerLibro = async (req, res) => {
    try {
        const id = req.params.id
        const libro = await Libro.findById(id).populate('autor')
        if(!libro) {
            return res.status(404).json({message: 'Libro no encontrado'})
        }
        res.status(200).json(libro)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const crearLibro = async (req, res) => {
    try {
        const libro = new Libro(req.body)
        await libro.save()
        res.status(201).json(libro)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const modificarLibro = async (req, res) => {
    try {
        const id = req.params.id
        const libro = await Libro.findByIdAndUpdate(id,req.body, { new:true })
        if(!libro) return res.status(404).json({message: 'Libro no encontrado'})
        res.status(200).json(libro)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const eliminarLibro = async (req, res) => {
    try {
        const id = req.params.id
        const eliminado = await Libro.findByIdAndDelete(id)
        if(!eliminado) return res.status(404).json({message: 'Libro no encontrado'})
        res.status(200).json({message: 'Libro eliminado con exito'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    obtenerLibros,
    obtenerLibro,
    crearLibro,
    modificarLibro,
    eliminarLibro
}