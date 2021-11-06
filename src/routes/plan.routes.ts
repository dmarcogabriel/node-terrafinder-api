import { Router } from 'express'
import { body, CustomValidator } from 'express-validator'
import { isNil } from 'lodash'
import authService from '../services/auth.service'
import planController from '../controllers/plan.controller'
import { PlanString } from '../types'
import { getUserPlan } from '../repositories/plan.repository'

const isPlanTypeCorrect: CustomValidator = (plan: PlanString) => {
  if (plan !== 'free-plan' && plan !== 'premium-plan' && plan !== 'pro-plan') {
    throw new Error(
      `Given Plan type does not exists: ${plan}
      expected: 'free-plan', 'premium-plan' or 'pro-plan'`,
    )
  }
  return true
}

const isValidUser: CustomValidator = async (userId: string) => {
  const plan = await getUserPlan(userId)
  if (isNil(plan)) return true
  throw new Error('User has already an existing plan.')
}

export const createPlanRoutes = (router: Router): void => {
  router.post(
    '/plans',
    authService.authorize,
    body('type').notEmpty().custom(isPlanTypeCorrect),
    body('user').notEmpty().custom(isValidUser),
    planController.createPlan,
  )
  router.get('/plans/:userId', authService.authorize, planController.getByUserId)
  router.put('/plans/activate/:id', authService.authorize, planController.activatePlan)
  router.put(
    '/plans/:id',
    authService.authorize,
    body('type').notEmpty().custom(isPlanTypeCorrect),
    planController.updatePlan,
  )
}
