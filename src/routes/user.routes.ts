import { Router } from 'express'
import authService from '../services/auth.service'
import userController from '../controllers/user.controller'

export const createUserRoutes = (router: Router): void => {
  router.post('/users', userController.post)
  router.get('/users', authService.authorize, userController.get)
  router.get('/users/:id', authService.authorize, userController.getById)
  router.put(
    '/users/upload-photos/:id',
    authService.authorize,
    userController.uploadFile,
  )
}
