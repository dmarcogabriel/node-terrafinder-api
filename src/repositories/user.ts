import { UploadedFile } from 'express-fileupload'
import { omit } from 'lodash'
import UserModel, { User, UserResponse } from '../models/User'
import { saveFileOnStorage } from '../services/fileUpload.service'

const getAll = async (id: string = null): Promise<UserResponse | UserResponse[]> => {
  if (id) {
    const user = await UserModel.findById(id)
    return omit(user.toObject(), 'password')
  }
  const users = UserModel.find()
  return users.map((user) => user.map((u) => omit(u, 'password')))
}

const create = async (data: User): Promise<string> => {
  const user: User = new UserModel(data)
  user.password = user.generateHash(data.password)
  await user.save()
  return user._id
}

interface LoginResponse {
  token: string
  id: string
}

const login = async (email: string, password: string): Promise<LoginResponse> => {
  const user: User = await UserModel.findOne({ email })
  if (!user) return null
  const userModel: User = new UserModel(user)
  if (!userModel.validateHash(password)) return null
  const id: string = userModel._id
  const token = user.generateAccessToken(id)
  return { id, token }
}

const updateAvatar = async (
  avatar: UploadedFile,
  id: string,
): Promise<string> => {
  const user: User = await UserModel.findById(id)
  const fileName = saveFileOnStorage(avatar)
  user.avatar = fileName
  user.updatedAt = new Date()
  await user.save()
  return user.avatar
  // todo: remove old avatar
}

const deleteUser = (id: string): void => {
  UserModel.findByIdAndRemove(id)
}

export default {
  getAll,
  create,
  deleteUser,
  login,
  updateAvatar,
}
