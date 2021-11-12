import { yellow } from 'chalk'
import { startServer } from './server'

const { PORT, DB_NAME } = process.env

const start = async () => {
  if (!DB_NAME) {
    throw new Error('DB_NAME variable is missing in .env file')
  }

  const app = await startServer(DB_NAME)
  const port = PORT || 8000

  app.listen(port, () => {
    console.info('server', `Running on port ${yellow(port)}`)
  })
}

start()
