const bcrypt = require('bcrypt')
const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  isDeleted: {type: Boolean, default: false},
  signUpDate: {type: Date, default: Date.now()}
})

UserSchema.methods.generateHash = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8))

UserSchema.methods.validateHash = function(password){
  return bcrypt.compareSync(password, this.password)
}


module.exports = model('User', UserSchema)