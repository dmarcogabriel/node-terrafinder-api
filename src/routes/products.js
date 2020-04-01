const express = require('express')
const router = express.Router()
const productController = require('../controllers/product-controller')


router.get('/', productController.index)
router.get('/:id', productController.getById)
router.post('/', productController.post)
router.put('/:id', productController.put)
router.delete('/:id', productController.delete)

module.exports = router
