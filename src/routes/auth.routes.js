const authController = require('../controllers/auth')
const forgotPasswordController = require('../controllers/forgotPassword')

module.exports = (routes) => {
  routes.post('/login', authController.login)
  routes.post(
    '/forgot-password',
    forgotPasswordController.sendForgotPasswordEmail,
  )
  routes.post(
    'reset-password',
    forgotPasswordController.resetPassword,
  )

  return routes
}
