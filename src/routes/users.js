const { Router } = require('express')
const userController = require('../controllers/user-controller')

const router = Router()

router.get('/', userController.index)
router.get('/:id', userController.getById)
router.post('/', userController.post)

module.exports = router