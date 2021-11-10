import { checkSchema, CustomValidator, body } from 'express-validator'
import PropertyModel from '../models/Property'
import { parseMoney } from '../utils/moneyParser'

const isUserProperty: CustomValidator = async (userId: string, { req }) => {
  // * In the future here it could get user's role to verify if it's admin, seller or customer
  const property = await PropertyModel.findById(req.params.id)
  if (property.user.toString() === userId) return true
  throw new Error('Property doest not belong to this user')
}

export default {
  createPropertyPolicy: checkSchema({
    user: {
      notEmpty: true,
      isString: {
        errorMessage: 'User must be a string',
      },
    },
    farming: {
      notEmpty: true,
      isArray: {
        errorMessage: 'Farming must be an Array',
      },
    },
    activities: {
      notEmpty: true,
      isArray: {
        errorMessage: 'Activities must be an Array',
      },
    },
    amount: {
      notEmpty: true,
      isString: {
        errorMessage: 'Amount must be a string type',
      },
      customSanitizer: {
        options: (value: string) => parseMoney(value),
      },
    },
    size: {
      notEmpty: true,
      isString: {
        errorMessage: 'Size must be a string type',
      },
    },
    name: {
      notEmpty: true,
      isString: {
        errorMessage: 'Name must be a string type',
      },
    },
    ownerName: {
      notEmpty: true,
      isString: {
        errorMessage: 'Owner Name must be a string type',
      },
      custom: {
        options: (value: string) => {
          if (value.split(' ').length < 2) {
            return false
          }
          return true
        },
        errorMessage: 'Owner Name must contain first and last names.',
      },
    },
    description: {
      notEmpty: true,
      isString: {
        errorMessage: 'Description must be a string type',
      },
    },
    propertyKind: {
      notEmpty: true,
      isString: {
        errorMessage: 'Property Kind must be a string type',
      },
    },
    state: {
      notEmpty: true,
      isString: {
        errorMessage: 'State must be a string type',
      },
      custom: {
        options: (value: string) => {
          if (value.length > 2) return false
          return true
        },
        errorMessage: 'State must contain only initials. Ex: São Paulo = SP',
      },
    },
    nearbyCity: {
      notEmpty: true,
      isString: {
        errorMessage: 'Nearby City must be a string type',
      },
    },
    cep: {
      notEmpty: true,
      isString: {
        errorMessage: 'CEP Kind must be a string type',
      },
      custom: {
        options: (value: string) => {
          if (value.length === 8) return false
          return true
        },
        errorMessage: 'CEP must contain 8 characteres',
      },
      customSanitizer: {
        options: (value: string) => value.replace(/[-]/g, ''),
      },
    },
  }),
  isUserProperty: body('userId').notEmpty().custom(isUserProperty),
}
