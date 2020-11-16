require('dotenv/config')

const jwt = require('jsonwebtoken')
const User = require('../app/models/User')
const { saveFileOnStorage } = require('../services/fileUpload')

exports.get = async (id = null) => {
  if (id) {
    return User.findById(id)
  }
  return User.find()
}

exports.post = async (data) => {
  const user = new User(data)

  user.password = user.generateHash(data.password)

  await user.save()
}

exports.put = ({ name, password, email }, id) => {
  const update = {
    $set: {
      name,
      password,
      email,
    },
  }

  const options = { omitUndefined: true }

  return User.findByIdAndUpdate(id, update, options)
}

exports.delete = (id) => User.findOneAndRemove(id)

exports.login = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) return null

  const userModel = new User(user)

  if (!userModel.validateHash(password)) return null

  const id = userModel._id
  const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: 60000 })

  return { token, id }
}

exports.saveAvatar = async ({ avatar }, id) => {
  const user = await User.findById(id)
  const fileName = saveFileOnStorage(avatar)

  user.avatar = fileName
  user.updatedAt = Date.now()

  await user.save()
  return user.avatar
}
