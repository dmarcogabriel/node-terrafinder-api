const repository = require('../repositories/product-repository')

exports.index = async (req, res) => {
  try {
    const data = await repository.get()

    res.status(200).json(data)
  }catch(err) {
    res.send(err)
  }
}

exports.post = async (req, res) => {
  const { name, price, description } = req.body

  try {
    await repository.post({ name, price, description })

    return res.status(201).json({ message: 'Product created succesfully!' })
  }catch(error) {
    return res.status(500).json({
      message: '[Error] failed to save product',
      error
    })
  }
}

exports.getById = async (req, res) => {
  const { id } = req.params

  try {
    const product = await repository.get(id)

    if (!product) {
      return res.status(400).json({
        message: 'Product not Found'
      })
    }

    return res.status(200).json({ product })
  } catch(error) {

    return res.status(500).json({
      message: '[Error] Malformed id',
      error,
    })
  }
}

exports.put = async (req, res) => {
  const { id } = req.params
  const { name, price, description } = req.body

  try {
    await repository.put({ name, price, description }, id)

    return res.status(200).json({ message : 'Product updated successfully.' })
  } catch(error) {
    return res.status(500).json({ 
      message: '[Error] Failed to update product', 
      error
    })
  }
}

exports.delete = async (req, res) => {
  const { id } = req.params

  try {
    await repository.delete(id)

    return res.status(200).json({ message: 'Product deleted successfuly' })
  } catch(error) {
    return res.status(500).json({
      message: '[Error] failed to delete',
      error
    })
  }
}