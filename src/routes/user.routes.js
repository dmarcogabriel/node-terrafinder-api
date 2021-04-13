const userController = require('../controllers/user')
const authService = require('../services/auth')

module.exports = (routes) => {
  routes.post('/users', userController.post)
  routes.get('/users', authService.authorize, userController.index)
  routes.get('/users/:id', authService.authorize, userController.getById)
  routes.put(
    '/users/upload-photos/:id',
    authService.authorize,
    userController.uploadFile,
  )

  return routes
}
