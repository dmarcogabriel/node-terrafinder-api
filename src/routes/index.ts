import { Router } from 'express'
import { createUserRoutes } from './user.routes'
import { createPropertyRoutes } from './property.routes'
import { createAuthRoutes } from './auth.routes'
import { createIndexRoutes } from './index.routes'

const router = Router()

createUserRoutes(router)
createPropertyRoutes(router)
createAuthRoutes(router)
createIndexRoutes(router)

export default router
