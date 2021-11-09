import { Router } from 'express'
import authService from '../services/auth.service'
import propertyController from '../controllers/property.controller'
import { validate } from '../middlewares'
import { propertyPolicies } from '../policies'

const router = Router()

router.post(
  '/',
  authService.authorize,
  propertyPolicies.createPropertyPolicy,
  validate,
  propertyController.post,
)
router.get('/', propertyController.getAll)
router.get('/:id', propertyController.getById)
router.get('/user/:userId', propertyController.getAllByUserId)
router.put(
  '/upload-photos/:id',
  authService.authorize,
  propertyPolicies.isUserProperty,
  validate,
  propertyController.updatePropertyPhotos,
)
router.put(
  '/activate/:id',
  authService.authorize,
  propertyPolicies.isUserProperty,
  validate,
  propertyController.activateProperty,
)
router.delete(
  '/:id',
  authService.authorize,
  propertyPolicies.isUserProperty,
  validate,
  propertyController.deleteProperty,
)

export default router
