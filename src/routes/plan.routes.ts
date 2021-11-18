import { Router } from 'express'
import authService from '../services/auth.service'
import planController from '../controllers/plan.controller'
import { validate } from '../middlewares'
import { planPolicies } from '../policies'

const router = Router()

router.post(
  '/',
  authService.authorize,
  planPolicies.createPlanPolicy,
  validate,
  planController.createPlan,
)
router.get('/:propertyId', authService.authorize, planController.getByPropertyId)
router.put(
  '/activate/:id',
  authService.authorize,
  planPolicies.isPropertyPlan,
  validate,
  planController.activatePlan,
)
router.put(
  '/:id',
  authService.authorize,
  planPolicies.isPlanStringValid,
  planPolicies.isPropertyPlan,
  validate,
  planController.updatePlan,
)

export default router
