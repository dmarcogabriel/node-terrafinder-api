import { isArray, isNil } from 'lodash'
import { FilterQuery } from 'mongoose'
import { Property } from '../models/Property'

export const parseRangeFilter = (queryValue: string): FilterQuery<Property> | null => {
  const parsedValue = JSON.parse(queryValue)
  if (!isArray(parsedValue) || isNil(parsedValue)) return null
  const [min, max] = parsedValue
  return { $gte: min, $lte: max }
}

export const createPropertyFilter = (query: any): FilterQuery<Property> | null => {
  const filters: FilterQuery<Property> = {}
  if (query.isActive) filters.isActive = { $eq: JSON.parse(query.isActive) }
  if (query.amount) {
    const [min, max] = JSON.parse(query.amount)
    const amount: { $gte: number, $lte?: number } = { $gte: min }
    if (max === 50000000) amount.$lte = max
    filters.amount = amount
  }
  if (query.size) {
    const [min, max] = JSON.parse(query.size)
    const size: { $gte: string, $lte?: string } = { $gte: String(min) }
    // if (max === 350) size.$lte = String(max)
    filters.size = size
  }
  if (query.propertyKind) filters.propertyKind = { $eq: query.propertyKind }
  if (query.state) filters.state = { $eq: query.state }
  return isNil(filters) ? null : filters
}
