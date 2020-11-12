---
to: src/controllers/<%= name %>.js
unless_exists: true
---
const repository = require('../repositories/<%= name %>')

exports.create = async (req, res) => {
  try {
    await repository.create(req.body)

    return res.status(201).json({message: '<%= name %> criado com sucesso!'})
  }catch(error) {
    return res.status(500).json({
      message: '[Error] failed to save <%= name %>',
      error
    })
  }
}

exports.getAll = async (_, res) => {
  try {
    const data = await repository.get()

    res.status(200).json(data)
  }catch(err) {
    res.send(err)
  }
}

exports.getById = async (req, res) => {
  const {id} = req.params

  try {
    const product = await repository.get(id)

    if (!product) {
      return res.status(400).json({
        message: '<%= name %> não encontrado'
      })
    }

    return res.status(200).json({product})
  } catch(error) {

    return res.status(500).json({
      message: '[Error] Malformed id',
      error,
    })
  }
}

exports.update = async (req, res) => {
  const {id} = req.params

  try {
    await repository.put(req.body, id)

    return res.status(200).json({message : '<%= name %> updated successfully.'})
  } catch(error) {
    return res.status(500).json({
      message: '[Error] Failed to update',
      error
    })
  }
}

exports.delete = async (req, res) => {
  const {id} = req.params

  try {
    await repository.delete(id)

    return res.status(200).json({message: '<%= name %> removido'})
  } catch(error) {
    return res.status(500).json({
      message: '[Error] failed to delete',
      error
    })
  }
}