export interface Property {
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
  isActive: boolean
  user: any
  updatedAt?: Date
  createdAt?: Date
}
