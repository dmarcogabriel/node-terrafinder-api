const { Schema, model } = require('mongoose')

module.exports = model('User', new Schema({
  name: String,
  email: String,
  password: String
}))