import { Router } from 'express'
import { createUserRoutes } from './user.routes'
import { createPropertyRoutes } from './property.routes'
import { createAuthRoutes } from './auth.routes'
import { createIndexRoutes } from './index.routes'
import { createPlanRoutes } from './plan.routes'

const router = Router()

createUserRoutes(router)
createPropertyRoutes(router)
createAuthRoutes(router)
createIndexRoutes(router)
createPlanRoutes(router)

export default router
