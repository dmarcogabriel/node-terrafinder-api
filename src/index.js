const server = require('./server')

const start = async () => {
  const app = await server.createServer('terrafinder')

  app.listen(process.env.PORT || 8000)
}

start()
