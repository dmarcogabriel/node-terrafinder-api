import { UploadedFile } from 'express-fileupload'
import { omit } from 'lodash'
import UserModel, { User, UserResponse } from '../models/User'
import { saveFileOnStorage } from '../services/fileUpload.service'

const getAll = async (): Promise<UserResponse[]> => {
  const users = UserModel.find()
  return users.map((user) => user.map((u) => omit(u, 'password')))
}

const findById = (id: string): Promise<UserResponse> => UserModel.findWithPlan(id)

const findByEmail = async (email: string): Promise<User> => {
  const [user] = await UserModel.where('email', email).exec()
  return user
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

const login = async (email: string, password: string): Promise<LoginResponse | null> => {
  const user = await UserModel.findOne({ email })
  if (!user) return null
  const userModel = new UserModel(user)
  if (!userModel.validateHash(password)) return null
  const id: string = userModel._id
  const token = user.generateAccessToken(id)
  return { id, token }
}

const updateAvatar = async (
  avatar: UploadedFile,
  id: string,
): Promise<string | null> => {
  const user = await UserModel.findById(id)
  if (user) {
    const fileName = saveFileOnStorage(avatar)
    user.avatar = fileName
    user.updatedAt = new Date()
    // todo: remove old avatar
    await user.save()
    return user.avatar
  }
  return null
}

const deleteUser = (id: string): void => {
  UserModel.findByIdAndRemove(id)
  // todo: remove avatar file
}

const changePlan = async (id: string, plan: string): Promise<User | null> => {
  const user = await UserModel.findById(id)
  if (user) {
    user.plan = plan
    await user.save()
    return user
  }
  return null
}

export default {
  getAll,
  findById,
  create,
  deleteUser,
  login,
  updateAvatar,
  changePlan,
  findByEmail,
  resetPassword: async (id: string, password: string): Promise<void> => {
    const user = await UserModel.findById(id)
    if (user) {
      user.password = user.generateHash(password)
      await user.save()
    }
  },
}
