const repository = require('../repositories/property')

exports.post = async (req, res) => {
  try {
    await repository.create(req.body)

    return res.status(201).json({message: 'Anúncio criado com sucesso!'})
  }catch(error) {
    return res.status(500).json({
      message: '[Error] failed to save property',
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
        message: 'Propriedade não encontrada'
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

exports.getAllByUserId = async (req, res) => {
  const {userId} = req.params

  try {
    const ads = await repository.getByUserId(userId)

    if (!ads) {
      return res.status(400).json({
        message: 'Propriedade não encontrada'
      })
    }

    return res.status(200).json({ads})
  } catch(error) {

    return res.status(500).json({
      message: '[Error] Malformed id',
      error,
    })
  }
}
