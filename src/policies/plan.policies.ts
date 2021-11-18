import { checkSchema, CustomValidator, body } from 'express-validator'
import { isNil } from 'lodash'
import { getPropertyPlan, getPlanById } from '../repositories/plan.repository'

const isPropertyPlan: CustomValidator = async (propertyId: string, { req }) => {
  if (req.params && req.params.id) {
    const plan = await getPlanById(req.params.id)
    if (plan && plan.property.toString() === propertyId) return true
    throw new Error('Plan does not belong to given property.')
  } else {
    throw new Error('propertyId param is missing')
  }
}

const isPlanStringValid: CustomValidator = (plan: string) => {
  if (plan === 'free-plan' || plan === 'premium-plan' || plan === 'pro-plan') return true
  throw new Error(
    'Invalid value for plan, expected: \'free-plan\', \'premium-plan\' or \'pro-plan\'',
  )
}

export default {
  createPlanPolicy: checkSchema({
    type: {
      notEmpty: true,
      isString: {
        errorMessage: 'Type must be a string',
      },
      custom: {
        options: isPlanStringValid,
      },
    },
    property: {
      notEmpty: true,
      isString: {
        errorMessage: 'property must be a string',
      },
      custom: {
        options: async (propertyId: string) => {
          const plan = await getPropertyPlan(propertyId)
          if (!isNil(plan)) throw new Error('property has already an existing plan.')
        },
      },
    },
    isActive: {
      optional: { options: { nullable: true } },
      isBoolean: true,
    },
    activationDate: {
      optional: { options: { nullable: true } },
      isDate: true,
    },
  }),
  isPropertyPlan: body('propertyId').notEmpty().custom(isPropertyPlan),
  isPlanStringValid: body('type').notEmpty().custom(isPlanStringValid),
}
