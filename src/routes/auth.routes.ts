import { Router } from 'express'
import authController from '../controllers/auth.controller'
import forgotPasswordController from '../controllers/forgotPassword.controller'

export const createAuthRoutes = (router: Router): void => {
  router.post('/login', authController.login)
  router.post(
    '/forgot-password',
    forgotPasswordController.sendForgotPasswordEmail,
  )
  router.post(
    'reset-password',
    forgotPasswordController.resetPassword,
  )
}
