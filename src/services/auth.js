require('dotenv/config')
const jwt = require('jsonwebtoken')

exports.authorize = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token)
    res.status(401).json({auth: false, message: 'Acesso restrito'})
  else {
    jwt.verify(token, process.env.SECRET, (error) => {
      if (error)
        res.status(401).json({auth: false, message: 'Token inválido'})
      else next()
    })
  }
}