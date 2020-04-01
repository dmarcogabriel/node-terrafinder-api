const { User } = require('../app/models/user')

exports.index = async (req, res) => {
  const users = await User.find()

  res.status(200).json({ users })
}

exports.post = async (req, res) => {
  const { name, email, password } = req.body

  const user = new User()

  user.name = name
  user.email = email
  user.password = password

  await user.save()

  res.status(201).json({ 
    message: 'User created successfully.'
  })

}

exports.getById = async (req, res) => {
  const user = await User.findById(req.params.id)

  res.status(200).json({ user })
}
