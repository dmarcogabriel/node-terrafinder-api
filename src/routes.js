const {Router} = require('express')

const authController = require('./controllers/auth')
const authService = require('./services/auth')
const productController = require('./controllers/product')
const userController = require('./controllers/user')

const routes = Router()

// Index (test)
routes.get('/', (_, res) => res.status(200).json({message:'Route test Ok'}))

// Login
routes.post('/login/', authController.login)

// Products
routes.get('/products/', authService.authorize, productController.index)
routes.get('/products/:id', productController.getById)
routes.post('/products/', productController.post)
routes.put('/products/:id', productController.put)
routes.delete('/products/:id', productController.delete)

// Users
routes.get('/users/', userController.index)
routes.get('/users/:id', userController.getById)
routes.post('/users/', userController.post)
routes.put('/users/:id', userController.update)
routes.delete('/users/:id', userController.delete)

module.exports = routes