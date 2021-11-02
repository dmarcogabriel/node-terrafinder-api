import { forIn, isNil, keys } from 'lodash'
import { FilterQuery } from 'mongoose'
import { FarmQueryString } from '../types'
import { Property } from '../models/Property'

type QueryKey = 'amount' | 'size' | 'propertyKind' | 'state';

export const parseRangeFilter = (query: FarmQueryString): FilterQuery<Property> => {
  if (isNil(query) && !keys(query).length) return null

  const filter: FilterQuery<Property> = {}
  forIn(query, (value, key: QueryKey) => {
    if (key === 'amount' || key === 'size') {
      const [min, max]: (number & RegExp)[] = JSON.parse(value)
      filter[key] = { $gte: min, $lte: max }
    } else {
      filter[key] = value
    }
  })
  return filter
}
