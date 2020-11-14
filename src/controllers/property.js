const repository = require('../repositories/property')

exports.post = async (req, res) => {
  try {
    const property = await repository.create(req.body)

    return res.status(201)
      .json({ message: 'Anúncio criado com sucesso!', property })
  } catch (error) {
    return res.status(500).json({
      message: '[Error] failed to save property',
      error,
    })
  }
}

exports.getAll = async (req, res) => {
  try {
    const data = await repository.get(req.query)

    res.status(200).json(data)
  } catch (err) {
    res.send(err)
  }
}

exports.getById = async (req, res) => {
  const { id } = req.params

  try {
    const property = await repository.getById(id)

    if (!property) {
      return res.status(400).json({
        message: 'Propriedade não encontrada',
      })
    }

    return res.status(200).json({ property })
  } catch (error) {
    return res.status(500).json({
      message: '[Error] Malformed id',
      error,
    })
  }
}

exports.getAllByUserId = async (req, res) => {
  const { userId } = req.params

  try {
    const properties = await repository.getByUserId(userId)

    if (!properties) {
      return res.status(400).json({
        message: 'Propriedade não encontrada',
      })
    }

    return res.status(200).json({ properties })
  } catch (error) {
    return res.status(500).json({
      message: '[Error] Malformed id',
      error,
    })
  }
}

exports.uploadFiles = async (req, res) => {
  if (!req.files && !req.params.id) {
    return res.status(400).json({ message: 'Nenhuma imagem foi selecionada' })
  }

  try {
    await repository.savePhotos(req.files, req.params.id)

    return res.status(201).json({
      message: 'Imagem adicionada com sucesso',
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Ocorreu um erro ao fazer upload',
    })
  }
}
