import { isArray, isNil } from 'lodash'
import { FilterQuery } from 'mongoose'
import { Property } from '../models/Property'
import { parseMoney } from './moneyParser'

const MAX_AMOUNT = 50000000
const MAX_SIZE = 350

export const parseRangeFilter = (queryValue: string): FilterQuery<Property> | null => {
  const parsedValue = JSON.parse(queryValue)
  if (!isArray(parsedValue) || isNil(parsedValue)) return null
  const [min, max] = parsedValue
  return { $gte: min, $lte: max }
}

export const createPropertyFilter = (query: any): FilterQuery<Property> | null => {
  const filters: FilterQuery<Property> = {}
  if (query.isActive) filters.isActive = { $eq: JSON.parse(query.isActive) }
  if (query.size) {
    const [min, max] = JSON.parse(query.size)
    const size: { $gte: string, $lte?: string } = { $gte: String(min) }
    if (max < MAX_SIZE) size.$lte = String(max)
    filters.size = size
  }
  if (query.propertyKind) filters.propertyKind = { $eq: query.propertyKind }
  if (query.state) filters.state = { $eq: query.state }
  if (query.city) filters.nearbyCity = { $regex: new RegExp(`${query.city}`) }
  // todo: add code filter
  return isNil(filters) ? null : filters
}
