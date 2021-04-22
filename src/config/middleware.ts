import { Application } from 'express'
import { logger } from '../middlewares'

export const appMidlewares = (app: Application): void => {
  app.use(logger())
}
