/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * ! Atention: the order can't be modified
 */
const _ = require('lodash')

const capitalizeChoices = (choices) => choices.map((choice) => _.capitalize(choice))

const choices = ['development', 'staging', 'production']

exports.choices = choices
exports.options = [{
  type: 'rawlist',
  name: 'env',
  message: 'What environment?',
  choices: capitalizeChoices(choices),
  default: 'development',
  filter: (chosenOption) => _.toLower(chosenOption),
}]
