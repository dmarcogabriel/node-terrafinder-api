const {Router} = require('express')
const sessionController = require('../controllers/session-controller')

const router = Router()

router.post('/', sessionController.login)

module.exports = router