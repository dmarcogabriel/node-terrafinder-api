require('dotenv/config')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')
const productRoutes = require('./routes/products')
const userRoutes = require('./routes/users')
const sessionRoutes = require('./routes/sessions')
const signUpRoutes = require('./routes/signup')

const app = express()
const PORT = process.env.port || 3000

// DB config
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}` + 
  '@cluster0-bkb6b.mongodb.net/test?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology: true}
)

// App config
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Config router
app.use('/api', routes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/signup', signUpRoutes)

// Start app
app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`)
})
