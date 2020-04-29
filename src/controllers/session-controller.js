const repository = require('../repositories/user-repository')

exports.login = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await repository.login(email, password)

    if (!user) return res.status(400).json({
      message: 'E-mail ou senha incorretos!'
    })

    res.status(200).json(user)
  } catch(error) {
    res.status(500).send({
      message: 'Falha na autenticação',
      error
    })
  }
}