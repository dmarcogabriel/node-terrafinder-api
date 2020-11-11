require('dotenv/config')
const initDatabase = require('./config/database')
const app = require('./config/server')
const routes = require('./routes')

initDatabase()
  .then(() => {
    app.use('/api', routes)

    const PORT = process.env.port || 8000

    app.listen(PORT, () => {
      console.log(`server runing on port ${PORT}`)
    })
  }).catch((err) => {
    console.error('Erro ao conectar com o MongoDB')
    console.log(err)
  })
