import { Application } from 'express'
import { app, connect } from './config'
import routes from './routes'

const startServer = async (dbName: string): Promise<Application> => {
  await connect(dbName)
  app.use('/api', routes)
  return app
}

export { startServer }
