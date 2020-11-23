require('dotenv/config')
const database = require('./config/database')
const server = require('./config/server')
const routes = require('./routes')

const createServer = async (dbName) => {
  await database.connect(dbName)

  server.use('/api', routes)

  return server
}

module.exports = { createServer }
