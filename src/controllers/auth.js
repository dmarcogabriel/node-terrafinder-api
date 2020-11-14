const repository = require('../repositories/user')

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const { token, id } = await repository.login(email, password)

    if (!token) {
      return res.status(400).json({
        message: 'E-mail ou senha incorretos!',
      })
    }

    return res.status(200).json({ auth: true, token, userId: id })
  } catch (error) {
    return res.status(500).send({
      message: 'Falha na autenticação',
      error,
    })
  }
}
