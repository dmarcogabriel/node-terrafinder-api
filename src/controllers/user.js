const repository = require('../repositories/user')

exports.index = async (_, res) => {
  try {
    const users = await repository.get()

    return res.status(200).json({ users })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

exports.post = async (req, res) => {
  try {
    await repository.post(req.body)

    return res.status(201).json({
      message: 'User created successfully.',
    })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

exports.getById = async (req, res) => {
  try {
    const user = await repository.get(req.params.id)

    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

exports.uploadFile = async (req, res) => {
  if (!req.files && !req.params.id) {
    return res.status(400).json({ message: 'Nenhuma imagem foi selecionada' })
  }

  try {
    const avatar = await repository.saveAvatar(req.files, req.params.id)

    return res.status(201).json({
      message: 'Imagem adicionada com sucesso',
      avatar,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Ocorreu um erro ao fazer upload',
    })
  }
}
