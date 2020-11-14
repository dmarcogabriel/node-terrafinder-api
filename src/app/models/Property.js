const {Schema, model} = require('mongoose')

const PropertySchema = new Schema({
  name: {type: String, required: true},
  ownerName: {type: String, required: true},
  description: {type: String, required: true},
  propertyKind: {type: String, required: true},
  nearbyCity: {type: String, required: true},
  cep: {type: String, required: true},
  amount: {type: Number, required: true},
  size: String,
  state: {type: String, required: true, maxlength: 2},
  farming: {type: [String], required: true},
  activities: {type: [String], required: true},
  presentationPhoto: {type: String, required: false},
  photos: {type: [String], required: false},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedAt: {type: Date, default: Date.now()},
  createdAt: {type: Date, default: Date.now()},
})

module.exports = model('Property', PropertySchema)
