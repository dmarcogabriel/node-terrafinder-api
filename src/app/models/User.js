const bcrypt = require('bcrypt')
const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  cpf: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
  isDeleted: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
})

UserSchema.methods
  .generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8))

UserSchema.methods.validateHash = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = model('User', UserSchema)
