import { Router } from 'express'
import forgotPasswordController from '../controllers/forgotPassword.controller'

const router = Router()

router.post('/forgot', forgotPasswordController.sendForgotPasswordEmail)
router.post('/reset', forgotPasswordController.resetPassword)

export default router
