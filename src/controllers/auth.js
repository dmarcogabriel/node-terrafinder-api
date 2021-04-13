const repository = require('../repositories/user')

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const data = await repository.login(email, password)
    if (!data) {
      return res.status(400).json({
        message: 'E-mail ou senha incorretos!',
        auth: false,
      })
    }
    return res.status(200)
      .json({ auth: true, token: data.token, userId: data.id })
  } catch (error) {
    return res.status(500).send({
      message: 'Falha na autenticação',
      error,
    })
  }
}
