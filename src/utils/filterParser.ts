import { forIn, isNil, keys } from 'lodash'

const _setRangeFilter = (value: string) => {
  const [$gte, $lte]: Array<string> = JSON.parse(value)
  return { $gte, $lte }
}

const RANGE_FILTERS = {
  amount: true,
  size: true,
}

export const parseRangeFilter = (query: any) => {
  if (isNil(query) && !keys(query).length) return null

  const filter: any = {}
  forIn(query, (value, key) => {
    // todo: fix this shit
    if (key === 'amount' || key === 'size') {
      filter[key] = _setRangeFilter(value)
    } else filter[key] = value
  })
  return filter
}
