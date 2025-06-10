const Autor = require('../models/autor')
const Libro = require('../models/libro')
const redisClient = require('../config/redisClient')

const obtenerAutores = async (_,res) => {
    const cacheKey = 'autores:todos'
    try {
        const cached = await redisClient.get(cacheKey)
        if(cached){
            return res.status(200).json(JSON.parse(cached))
        }
        const autores = await Autor.find().select('nombre nacionalidad -_id')
        await redisClient.set(cacheKey, JSON.stringify(autores), { EX: 300 })
        res.status(200).json(autores)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const obtenerAutor = async (req, res) => {
    try {
        const id = req.params.id
        const cacheKey = `autor:${id}`
        const cached = await redisClient.get(cacheKey)
        if(cached){
            return res.status(200).json(JSON.parse(cached))
        }
        const autor = await Autor.findById(id)
        if(!autor){
            return res.status(404).json({message: 'No se encontro el autor'})
        }
        await redisClient.set(cacheKey, JSON.stringify(autor), { EX: 300 })
        res.status(200).json(autor)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const obtenerLibros = async (req, res) => {
    try {
        const id = req.params.id
        const autor = await Autor.findById(id)
        if(!autor){
            return res.status(404).json({message: 'No se encontro el autor'})
        }
        const libros = await Libro.find({ autor: id }).select('titulo fechaPublicacion genero -_id')
        res.status(200).json(libros)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const crearAutor = async (req,res) => {
    try {
        const nuevoAutor = new Autor(req.body)
        await nuevoAutor.save()
        await redisClient.del('autores:todos')
        res.status(201).json(nuevoAutor)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const editarAutor = async (req, res) => {
    try {
        const autorActualizado = await Autor.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!autorActualizado) {
            return res.status(404).json({ mensaje: 'Autor no encontrado' })
        }
        await redisClient.del(`autor:${req.params.id}`)
        await redisClient.del('autores:todos')
        res.json({ mensaje: 'Autor actualizado', autor: autorActualizado })
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el autor', error })
    }
}

const eliminarAutor = async (req, res) => {
    try {
        const autorId = req.params.id;
        await Libro.deleteMany({ autor: autorId })
        const autorEliminado = await Autor.findByIdAndDelete(autorId)
        if (!autorEliminado) {
            return res.status(404).json({ mensaje: 'Autor no encontrado' })
        }
        await redisClient.del(`autor:${autorId}`)
        await redisClient.del('autores:todos')
        res.json({ mensaje: 'Autor eliminado', autor: autorEliminado })
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el autor', error })
    }
}

module.exports = {
    obtenerAutores,
    obtenerAutor,
    crearAutor,
    editarAutor,
    eliminarAutor,
    obtenerLibros
}