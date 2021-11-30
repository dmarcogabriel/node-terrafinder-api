import { Schema, model } from 'mongoose'
import { Support } from '../types'

const SupportSchema = new Schema<Support>({
  name: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, default: false },
  message: { type: String, default: null },
  updatedAt: { type: Date, default: new Date() },
  createdAt: { type: Date, default: new Date() },
})

export default model<Support>('Support', SupportSchema)
