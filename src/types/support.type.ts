import { Document } from 'mongoose'

export interface Support extends Document {
  name: string
  email: string
  phone: string
  message: string
  updatedAt: Date
  createdAt: Date
}
