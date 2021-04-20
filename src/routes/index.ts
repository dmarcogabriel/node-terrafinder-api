import { Router } from 'express'
import { createUserRoutes } from './user.routes'
import { createPropertyRoutes } from './property.routes'
import { createAuthRoutes } from './auth.routes'

const router = Router()

createUserRoutes(router)
createPropertyRoutes(router)
createAuthRoutes(router)

export default router
