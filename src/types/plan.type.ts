import { Document, Model } from 'mongoose'

export type PlanString = 'free-plan' | 'premium-plan' | 'pro-plan'

export interface Plan extends Document {
  type: string
  user: string
  isActive: boolean
  activationDate: Date
  isDeleted?: boolean
  updatedAt: Date
  createdAt: Date
}

export interface PlanModel extends Model<Plan> {
  activate(id: string): Promise<Plan>
  findByUserId(user: string): Promise<Plan>
}
