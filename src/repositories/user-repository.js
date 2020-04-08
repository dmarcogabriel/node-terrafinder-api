const User = require('../app/models/user')

exports.get = async (id = null) => {
  if (id) {
    return User.findById(id)
  }
  return User.find()
}

exports.post = async data => {
  const user = new User(data)

  await user.save()
}

exports.put = ({ name, password, email}, id) => {
  const update = {
    $set: {
      name,
      password,
      email
    }
  }

  const options = { omitUndefined: true }

  return User.findByIdAndUpdate(id, update, options)
}

exports.delete = id => User.findByIdAndDelete(id)
