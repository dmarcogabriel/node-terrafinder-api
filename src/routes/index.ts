import { Router } from 'express'
import authController from '../controllers/auth.controller'
import passwordRoutes from './password.routes'
import userRoutes from './user.routes'
import propertyRoutes from './property.routes'
import planRoutes from './plan.routes'
import supportRoutes from './support.routes'

const router = Router()

router.use('/users', userRoutes)
router.use('/properties', propertyRoutes)
router.use('/plans', planRoutes)
router.use('/password', passwordRoutes)
router.use('/support', supportRoutes)
router.post('/login', authController.login)

export default router
