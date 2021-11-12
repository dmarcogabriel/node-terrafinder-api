import bcrypt from 'bcrypt'
import {
  Schema, Model, model, Document,
} from 'mongoose'
import jwt from 'jsonwebtoken'

const EXPIRATION_TIME = 60000
const SECRET_HASH: string | undefined = process.env.SECRET

export interface User extends Document {
  firstName: string
  lastName: string
  phone: string
  cpf: string
  email: string
  password: string
  avatar?: string
  plan?: any
  isDeleted?: boolean
  updatedAt: Date
  createdAt: Date
  generateHash(password: string): string
  validateHash(password: string): boolean
  generateAccessToken(id: string): string
}

export interface UserResponse {
  firstName: string
  lastName: string
  phone: string
  cpf: string
  email: string
  password?: string
  avatar?: string
  plan?: any
  isDeleted?: boolean
  updatedAt: Date
  createdAt: Date
}

interface UserModel extends Model<User> {
  findWithPlan(id: string): Promise<User>
}

const UserSchema = new Schema<User, UserModel>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  cpf: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
  plan: {
    type: Schema.Types.ObjectId,
    ref: 'Plan',
    required: false,
  },
  isDeleted: { type: Boolean, default: false },
  updatedAt: { type: Date, default: new Date() },
  createdAt: { type: Date, default: new Date() },
})

UserSchema.methods
  .generateHash = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync())

UserSchema.methods.validateHash = function (password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.methods
  .generateAccessToken = (id: string): string => jwt.sign({ id }, SECRET_HASH || '', {
    expiresIn: EXPIRATION_TIME,
  })

UserSchema.statics.findWithPlan = async function (this: UserModel, id: string) {
  const user = await this.findById(id).exec()
  if (user) return user.populate('plan').execPopulate()
  return null
}

export default model<User, UserModel>('User', UserSchema)
