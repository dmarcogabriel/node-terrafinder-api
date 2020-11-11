require('dotenv/config')
const mongoose = require('mongoose')

module.exports = async () => mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
  `@cluster0.c0qzu.mongodb.net/${process.env.DB_NAME}` +
  '?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology: true}
)

