import { Application } from 'express'
import { app as server, connect } from './config'
import routes from './routes'

const createServer = async (dbName: string): Promise<Application> => {
  await connect(dbName)
  server.use('/api', routes)
  return server
}

export { createServer }
