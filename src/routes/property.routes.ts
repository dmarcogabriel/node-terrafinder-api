import { Router } from 'express'
import authService from '../services/auth.service'
import propertyController from '../controllers/property.controller'

export const createPropertyRoutes = (router: Router): void => {
  router.post('/properties', authService.authorize, propertyController.post)
  router.get('/properties', propertyController.getAll)
  router.get('/property/:id', propertyController.getById)
  router.get('/properties/user/:userId', propertyController.getAllByUserId)
  router.put(
    '/property/upload-photos/:id',
    authService.authorize,
    propertyController.updatePropertyPhotos,
  )
  router.put('/properties/activate/:id', authService.authorize, propertyController.activateProperty)
  router.delete('/properties/:id', authService.authorize, propertyController.deleteProperty)
}
