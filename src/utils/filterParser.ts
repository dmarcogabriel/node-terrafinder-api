import { isArray, isNil } from 'lodash'
import { FilterQuery } from 'mongoose'
import { Property } from '../models/Property'

export const parseRangeFilter = (queryValue: string): FilterQuery<Property> => {
  const parsedValue = JSON.parse(queryValue)
  if (!isArray(parsedValue) || isNil(parsedValue)) return null
  const [min, max] = parsedValue
  return { $gte: min, $lte: max }
}

export const createPropertyFilter = (query: any): FilterQuery<Property> => {
  const filters: FilterQuery<Property> = {}
  if (query.isActive) filters.isActive = { $eq: JSON.parse(query.isActive) }
  if (query.amount) {
    const [min, max] = JSON.parse(query.amount)
    filters.amount = { $gte: min, $lte: max }
  }
  if (query.size) {
    const [min, max] = JSON.parse(query.size)
    filters.size = { $gte: min, $lte: max }
  }
  if (query.propertyKind) filters.propertyKind = { $eq: query.propertyKind }
  if (query.state) filters.state = { $eq: query.state }
  return filters
}
