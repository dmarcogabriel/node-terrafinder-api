const Product = require('../app/models/product')

exports.get = async (id = null) => {
  if (id) {
    return Product.findById(id)
  }
  const products = await Product.find()
  const total = await Product.count()

  return {products, total}
}

exports.post = async data => {  
  const product = new Product(data)

  await product.save()
}

exports.put = ({name, description, price}, id) => {
  const update = {
    $set: {
      name,
      description,
      price
    }
  }

  const options = {omitUndefined: true}

  return Product.findByIdAndUpdate(id, update, options)
}

exports.delete = id => Product.findByIdAndRemove(id)