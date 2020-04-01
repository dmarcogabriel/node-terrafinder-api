const { Schema, model } = require('mongoose')

exports.User = model('User', new Schema({
  name: String,
  email: String,
  password: String
}))