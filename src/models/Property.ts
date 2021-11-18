import {
  Schema, model, Document, Model,
} from 'mongoose'

export interface Property extends Document {
  name: string
  ownerName: string
  description: string
  propertyKind: string
  nearbyCity: string
  cep: string
  amount: number | string
  size: string
  state: string
  farming: Array<string>
  activities: Array<string>
  presentationPhoto: string
  photos: Array<string>
  user: any
  plan: any
  updatedAt: Date
  createdAt: Date
}

interface PropertyModel extends Model<Property> {
  findByUserId(userId: string): Promise<Array<Property>>
  findWithUserAndPlan(id: string): Promise<Property>
}

const PropertySchema = new Schema<Property, PropertyModel>({
  name: { type: String, required: true },
  ownerName: { type: String, required: true },
  description: { type: String, required: true },
  propertyKind: { type: String, required: true },
  nearbyCity: { type: String, required: true },
  cep: { type: String, required: true },
  amount: { type: Number, required: true },
  size: String,
  state: { type: String, required: true, maxlength: 2 },
  farming: { type: [String], required: true },
  activities: { type: [String], required: true },
  presentationPhoto: { type: String, required: false },
  photos: { type: [String], required: false },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: Schema.Types.ObjectId,
    ref: 'Plan',
    required: false,
  },
  updatedAt: { type: Date, default: new Date() },
  createdAt: { type: Date, default: new Date() },
})

PropertySchema.statics.findByUserId = function (
  this: PropertyModel,
  userId: string,
) {
  return this.where('user', userId).populate('plan').exec()
}

PropertySchema.statics.findWithUserAndPlan = async function (this: PropertyModel, id: string) {
  const property = await this.findById(id).exec()
  if (property) return property.populate('user').populate('plan').execPopulate()
  return null
}

export default model<Property, PropertyModel>('Property', PropertySchema)
