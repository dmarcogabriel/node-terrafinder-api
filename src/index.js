const server = require('./server')

const start = async () => {
  const app = await server.createServer('terrafinder')
  const port = process.env.PORT || 8000

  app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`server is running at http://localhost:${port}`)
  })
}

start()
