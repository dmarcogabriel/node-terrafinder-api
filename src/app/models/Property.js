const {Schema, model} = require('mongoose')

const PropertySchema = new Schema({
  name: String,
  ownerName: String,
  description: String,
  propertyKind: String,
  state: String,
  nearbyCity: String,
  cep: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Property', PropertySchema)
