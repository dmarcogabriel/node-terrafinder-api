const { Router } = require('express')
const authService = require('./services/auth')
const authController = require('./controllers/auth')
const userController = require('./controllers/user')
const propertyController = require('./controllers/property')

const routes = Router()

routes.get('/', (_, res) => res.status(200).json({ message: 'Route test Ok' }))

routes.post('/login', authController.login)

routes.post('/users', userController.post)
routes.get('/users', authService.authorize, userController.index)
routes.get('/users/:id', authService.authorize, userController.getById)
routes.put(
  '/users/upload-photos/:id',
  authService.authorize,
  userController.uploadFile,
)

routes.post('/properties', propertyController.post)
routes.get('/properties', propertyController.getAll)
routes.get('/property/:id', propertyController.getById)
routes.get('/properties/user/:userId', propertyController.getAllByUserId)
routes.post('/property/upload-photos/:id', propertyController.uploadFiles)
routes.delete('/properties/:id', propertyController.delete)

module.exports = routes
