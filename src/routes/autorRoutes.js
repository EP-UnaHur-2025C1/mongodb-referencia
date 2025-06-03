const { Router } = require('express')
const autorController = require('../controllers/autorController')
const router = Router()

router.get('/', autorController.obtenerAutores)
router.get('/:id', autorController.obtenerAutor)
router.get('/:id/libros', autorController.obtenerLibros)
router.post('/', autorController.crearAutor)
router.put('/:id', autorController.editarAutor)
router.delete('/:id', autorController.eliminarAutor)

module.exports = router
