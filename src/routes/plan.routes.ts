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
router.get('/:userId', authService.authorize, planController.getByUserId)
router.put(
  '/activate/:id',
  authService.authorize,
  planPolicies.isUserPlan,
  validate,
  planController.activatePlan,
)
router.put(
  '/:id',
  authService.authorize,
  planPolicies.isPlanStringValid,
  planPolicies.isUserPlan,
  validate,
  planController.updatePlan,
)

export default router
