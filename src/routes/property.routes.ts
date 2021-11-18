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
router.get('/filters', propertyController.getPropertyFilters)
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
  '/:id',
  authService.authorize,
  propertyPolicies.isUserProperty,
  validate,
  propertyController.updateProperty,
)
router.delete(
  '/:id',
  authService.authorize,
  propertyPolicies.isUserProperty,
  validate,
  propertyController.deleteProperty,
)

export default router
