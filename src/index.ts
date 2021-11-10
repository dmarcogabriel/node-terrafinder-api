import { yellow } from 'chalk'
import { startServer } from './server'

const { PORT, DB_NAME } = process.env

const start = async () => {
  const app = await startServer(DB_NAME)
  const port = PORT || 8000

  app.listen(port, () => {
    console.info('server', `Running on port ${yellow(port)}`)
  })
}

start()
