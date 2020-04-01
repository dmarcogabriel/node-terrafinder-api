const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Product', productSchema)
