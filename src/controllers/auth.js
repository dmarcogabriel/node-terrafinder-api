const repository = require('../repositories/user')

exports.login = async (req, res) => {
  const {email, password} = req.body

  try {
    const token = await repository.login(email, password)

    if (!token) return res.status(400).json({
      message: 'E-mail ou senha incorretos!'
    })

    res.status(200).json({auth: true, token})
  } catch(error) {
    res.status(500).send({
      message: 'Falha na autenticação',
      error
    })
  }
}