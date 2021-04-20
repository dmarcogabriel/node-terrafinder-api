import { createServer } from './server'

const { PORT, DB_NAME } = process.env

const start = async () => {
  const app = await createServer(DB_NAME)
  const port = PORT || 8000

  app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`server is running at http://localhost:${port}`)
  })
}

start()
