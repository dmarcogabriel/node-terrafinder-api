import { Router } from 'express'
import authService from '../services/auth.service'
import userController from '../controllers/user.controller'

const router = Router()

router.post('/', userController.post)
router.get('/', authService.authorize, userController.get)
router.get('/:id', authService.authorize, userController.getById)
router.put(
  '/upload-photos/:id',
  authService.authorize,
  userController.uploadFile,
)
router.put('/:id', authService.authorize, userController.updatePlan)

export default router
