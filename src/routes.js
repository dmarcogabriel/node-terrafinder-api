const { Router } = require('express')
const authService = require('./services/auth')
const authController = require('./controllers/auth')
const userController = require('./controllers/user')
const propertyController = require('./controllers/property')

const routes = Router()

routes.post('/login', authController.login)

// User
routes.post('/users', userController.post)
routes.get('/users', authService.authorize, userController.index)
routes.get('/users/:id', authService.authorize, userController.getById)
routes.put(
  '/users/upload-photos/:id',
  authService.authorize,
  userController.uploadFile,
)

// Property
routes.post('/properties', authService.authorize, propertyController.post)
routes.get('/properties', propertyController.getAll)
routes.get('/property/:id', propertyController.getById)
routes.get('/properties/user/:userId', propertyController.getAllByUserId)
routes.put(
  '/property/upload-photos/:id',
  authService.authorize,
  propertyController.uploadFiles,
)

module.exports = routes
