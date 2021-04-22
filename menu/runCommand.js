/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const shell = require('shelljs')
const { blue, yellow, inverse } = require('chalk')

exports.run = (cmd) => {
  if (!shell.which('yarn')) {
    console.log(yellow('Could not find yarn'))
    shell.exit(1)
  }

  const command = `yarn ${cmd}`
  console.log(`${inverse(' LOG ')} running ${blue(command)}`)
  shell.exec(command)
}
