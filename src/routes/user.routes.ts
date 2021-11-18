import { Router } from 'express'
import authService from '../services/auth.service'
import userController from '../controllers/user.controller'
import { userPolicies } from '../policies'
import { validate } from '../middlewares'

const router = Router()

router.post('/', userPolicies.createUserPolicy, validate, userController.post)
router.get('/', authService.authorize, userController.get)
router.get('/:id', authService.authorize, userController.getById)
router.put(
  '/upload-photos/:id',
  authService.authorize,
  userPolicies.uploadUserAvatarPolicy,
  validate,
  userController.uploadFile,
)

export default router
