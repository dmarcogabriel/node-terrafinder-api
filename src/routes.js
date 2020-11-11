const {Router} = require('express')

const authController = require('./controllers/auth')
const authService = require('./services/auth')
const userController = require('./controllers/user')

const routes = Router()

routes.get('/', (_, res) => res.status(200).json({message:'Route test Ok'}))

routes.post('/login', authController.login)

routes.post('/users', userController.post)
routes.get('/users', authService.authorize, userController.index)
routes.get('/users/:id', authService.authorize, userController.getById)

module.exports = routes
