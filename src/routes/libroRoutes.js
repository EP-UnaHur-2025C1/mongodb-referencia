const { Router } = require('express')
const libroController = require('../controllers/libroController')
const router = Router()

router.get('/', libroController.obtenerLibros)
router.get('/:id', libroController.obtenerLibro)
router.post('/', libroController.crearLibro)
router.put('/:id', libroController.modificarLibro)
router.delete('/:id', libroController.eliminarLibro)

module.exports = router