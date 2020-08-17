require('dotenv/config')
const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
    '@cluster0-bkb6b.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
}

