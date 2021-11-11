import { Router } from 'express'
import supportController from '../controllers/support.controller'
import supportPolicies from '../policies/support.policies'
import { validate } from '../middlewares'

const router = Router()

router.post('/', supportPolicies.createPlanPolicy, validate, supportController.createSupport)

export default router
