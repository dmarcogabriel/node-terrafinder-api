const authService = require('../services/auth')
const propertyController = require('../controllers/property')

module.exports = (routes) => {
  routes.post('/properties', authService.authorize, propertyController.post)
  routes.get('/properties', propertyController.getAll)
  routes.get('/property/:id', propertyController.getById)
  routes.get('/properties/user/:userId', propertyController.getAllByUserId)
  routes.put(
    '/property/upload-photos/:id',
    authService.authorize,
    propertyController.uploadFiles,
  )

  return routes
}
