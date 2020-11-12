const Product = require('../app/models/Property')

exports.get = async (id = null) => {
  if (id) {
    return Product.findById(id)
  }
  const products = await Product.find()
  const total = await Product.count()

  return {products, total}
}

exports.create = async data => {
  const product = new Product(data)

  await product.save()
}

exports.getByUserId = async (userId) => {
  return Product.where('user', userId)
}

exports.delete = async id => Product.findByIdAndRemove(id)