/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const inquirer = require('inquirer')
const { options, choices } = require('./options')
const dotenvBuilder = require('./dotenvBuilder')
const runCommand = require('./runCommand')

const [dev, stg, prod] = choices

const commandKey = {
  [dev]: 'dev',
  [stg]: 'stg',
  [prod]: 'prod',
}

const bootstrap = async () => {
  const { env } = await inquirer.prompt(options)
  dotenvBuilder.build(commandKey[env])
  runCommand.run(`start:${commandKey[env]}`)
}

module.exports = bootstrap
