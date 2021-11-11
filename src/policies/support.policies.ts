import { checkSchema } from 'express-validator'

export default {
  createPlanPolicy: checkSchema({
    name: {
      notEmpty: true,
      isString: {
        errorMessage: 'Name must be a string',
      },
    },
    email: {
      notEmpty: true,
      isEmail: true,
      isString: {
        errorMessage: 'Email must be a string',
      },
    },
    phone: {
      notEmpty: true,
      isString: {
        errorMessage: 'Phone must be a string',
      },
    },
    message: {
      notEmpty: true,
      isString: {
        errorMessage: 'Message must be a string',
      },
    },
  }),
}
