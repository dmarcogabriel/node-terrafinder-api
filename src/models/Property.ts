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
  amount: number
  size: string
  state: string
  farming: Array<string>
  activities: Array<string>
  presentationPhoto: string
  photos: Array<string>
  user: any
  updatedAt: Date
  createdAt: Date
}

interface PropertyModel extends Model<Property> {
  findByUserId(userId: string): Promise<Array<Property>>
  findWithUser(id: string): Promise<Property>
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
  updatedAt: { type: Date, default: new Date() },
  createdAt: { type: Date, default: new Date() },
})

PropertySchema.statics.findByUserId = function (
  this: PropertyModel,
  userId: string,
) {
  return this.where('userId', userId).exec()
}

PropertySchema.statics.findWithUser = async function (this: PropertyModel, id: string) {
  const property: Property = await this.findById(id).exec()
  return property.populate('user').execPopulate()
}

export default model<Property, PropertyModel>('Property', PropertySchema)
