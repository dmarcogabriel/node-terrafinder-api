import { Router } from 'express'
import { get } from '../controllers/index.controller'

export const createIndexRoutes = (router: Router): void => {
  router.get('/', get)
}
