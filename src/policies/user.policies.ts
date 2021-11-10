import { checkSchema, CustomValidator } from 'express-validator'
import { isEmpty } from 'lodash'
import UserModel from '../models/User'

const isEmailUnique: CustomValidator = async (email: string) => {
  const users = await UserModel.where('email', email)
  if (!isEmpty(users)) throw new Error('Email already registered')
  return true
}

export default {
  createUserPolicy: checkSchema({
    firstName: {
      notEmpty: true,
      isString: {
        errorMessage: 'firstName must be a string',
      },
    },
    lastName: {
      notEmpty: true,
      isString: {
        errorMessage: 'lastName must be a string',
      },
    },
    phone: {
      notEmpty: true,
      isString: {
        errorMessage: 'lastName must be a string',
      },
      // todo: add custom and customSanitization
    },
    cpf: {
      notEmpty: true,
      isString: {
        errorMessage: 'lastName must be a string',
      },
      // todo: add custom and customSanitization
    },
    email: {
      notEmpty: true,
      isEmail: true,
      isString: {
        errorMessage: 'email must be a string',
      },
      custom: {
        options: isEmailUnique,
      },
    },
    password: {
      optional: { options: { nullable: true } },
      isString: {
        errorMessage: 'password must be a string',
      },
    },
    avatar: {
      optional: { options: { nullable: true } },
      isString: {
        errorMessage: 'avatar path must be a string',
      },
    },
    plan: {
      optional: { options: { nullable: true } },
      isString: {
        errorMessage: 'plan must be a string',
      },
    },
  }),
  uploadUserAvatarPolicy: checkSchema({
    email: {
      optional: { options: { nullable: true } },
      isEmail: true,
      isString: {
        errorMessage: 'email must be a string',
      },
      custom: {
        options: isEmailUnique,
      },
    },
    avatar: {
      optional: { options: { nullable: true } },
      isString: {
        errorMessage: 'avatar path must be a string',
      },
    },
  }),
  updateUserPolicy: checkSchema({
    firstName: {
      optional: { options: { nullable: true } },
      isString: {
        errorMessage: 'firstName must be a string',
      },
    },
    lastName: {
      optional: { options: { nullable: true } },
      isString: {
        errorMessage: 'lastName must be a string',
      },
    },
    phone: {
      optional: { options: { nullable: true } },
      isString: {
        errorMessage: 'lastName must be a string',
      },
      // todo: add custom and customSanitization
    },
    cpf: {
      optional: { options: { nullable: true } },
      isString: {
        errorMessage: 'lastName must be a string',
      },
      // todo: add custom and customSanitization
    },
    email: {
      optional: { options: { nullable: true } },
      isEmail: true,
      isString: {
        errorMessage: 'email must be a string',
      },
      custom: {
        options: isEmailUnique,
      },
    },
    password: {
      optional: { options: { nullable: true } },
      isString: {
        errorMessage: 'password must be a string',
      },
    },
    plan: {
      optional: { options: { nullable: true } },
      isString: {
        errorMessage: 'plan must be a string',
      },
    },
  }),
}
