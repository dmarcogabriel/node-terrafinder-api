require('dotenv/config')
require('./config/database')()

const app = require('./config/server')
const routes = require('./routes')

app.use('/api', routes)

const PORT = process.env.port || 8000

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`)
})
