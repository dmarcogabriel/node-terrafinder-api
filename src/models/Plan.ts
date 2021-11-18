import { Schema, model } from 'mongoose'
import { Plan, PlanModel } from '../types'

const PlanSchema = new Schema<Plan, PlanModel>({
  type: { type: String, require: true },
  userId: { type: String, require: true },
  isActive: { type: Boolean, default: false },
  activationDate: { type: Date, default: null },
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
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

PlanSchema.statics.findByPropertyId = async function (
  this: PlanModel,
  propertyId: string,
): Promise<Plan | null> {
  try {
    const [plan] = await this.where('property', propertyId).exec()
    return plan
  } catch (error) {
    return null
  }
}

export default model<Plan, PlanModel>('Plan', PlanSchema)
