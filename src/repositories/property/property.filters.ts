import { Property } from '../../models/Property'
import { parseMoney } from '../../utils/moneyParser'

const MAX_AMOUNT = 50000000.00
const MAX_SIZE = 350
const MIN_AMOUNT = 5000.00

export const filterProperties = (
  properties: Property[],
  filters: any,
): Property[] => properties
  .filter((property) => {
    if (filters.isActive) {
      if (property.plan && property.plan.isActive) {
        return property.plan.isActive === JSON.parse(filters.isActive)
      }
      return false
    }
    return true
  })
  .filter((property) => {
    if (filters.propertyKind) {
      return filters.propertyKind === property.propertyKind
    }
    return true
  })
  .filter((property) => {
    if (filters.state) {
      return filters.state === property.state
    }
    return true
  })
  .filter((property) => {
    if (filters.nearbyCity) {
      return property.nearbyCity.includes(filters.nearbyCity)
    }
    return true
  })
  .filter((property) => {
    if (filters.amountMin && parseMoney(filters.amountMin) > MIN_AMOUNT) {
      return property.amount > parseMoney(filters.amountMin)
    }
    return true
  })
  .filter((property) => {
    if (filters.amountMax && parseMoney(filters.amountMax) < MAX_AMOUNT) {
      return property.amount < parseMoney(filters.amountMax)
    }
    return true
  })
  .filter((property) => {
    if (filters.sizeMin) {
      return property.size > filters.sizeMin
    }
    return true
  })
  .filter((property) => {
    if (filters.sizeMax && filters.sizeMax < MAX_SIZE) {
      return property.size < filters.sizeMax
    }
    return true
  })
