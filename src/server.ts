import { Application } from 'express'
import server from './config/server'
import { connect } from './config/database'

// const routes = require('./routes')

const createServer = async (dbName: string): Promise<Application> => {
  await connect(dbName)
  // todo: add app routes
  // server.use('/api', routes)
  return server
}

export { createServer }
