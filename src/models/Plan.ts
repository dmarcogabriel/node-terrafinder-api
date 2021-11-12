import { Schema, model } from 'mongoose'
import { Plan, PlanModel } from '../types'

const PlanSchema = new Schema<Plan, PlanModel>({
  type: { type: String, require: true },
  userId: { type: String, require: true },
  isActive: { type: Boolean, default: false },
  activationDate: { type: Date, default: null },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    requried: true,
  },
  isDeleted: { type: Boolean, default: false },
  updatedAt: { type: Date, default: new Date() },
  createdAt: { type: Date, default: new Date() },
})

PlanSchema.statics.activate = async function (this: PlanModel, id: string) {
  const plan = await this.findById(id).exec()
  if (plan) {
    plan.isActive = true
    plan.activationDate = new Date()
    await plan.save()
    return plan
  }
  return null
}

PlanSchema.statics.findByUserId = async function (
  this: PlanModel,
  userId: string,
): Promise<Plan | null> {
  try {
    const [plan] = await this.where('user', userId).exec()
    return plan
  } catch (error) {
    return null
  }
}

export default model<Plan, PlanModel>('Plan', PlanSchema)
