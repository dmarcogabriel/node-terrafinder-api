import { checkSchema, CustomValidator, body } from 'express-validator'
import { isNil } from 'lodash'
import { getUserPlan, getPlanById } from '../repositories/plan.repository'

const isUsersPlan: CustomValidator = async (userId: string, { req }) => {
  if (req.params && req.params.id) {
    const plan = await getPlanById(req.params.id)
    if (plan && plan.user.toString() === userId) return true
    throw new Error('Plan does not belong to given user.')
  } else {
    throw new Error('userId param is missing')
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
    user: {
      notEmpty: true,
      isString: {
        errorMessage: 'User must be a string',
      },
      custom: {
        options: async (userId: string) => {
          const plan = await getUserPlan(userId)
          if (!isNil(plan)) throw new Error('User has already an existing plan.')
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
  isUserPlan: body('userId').notEmpty().custom(isUsersPlan),
  isPlanStringValid: body('type').notEmpty().custom(isPlanStringValid),
}
