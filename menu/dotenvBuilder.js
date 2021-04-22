/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra')
const path = require('path')

const rootDir = path.join(__dirname, '..')

module.exports = {
  build: (env) => {
    const envFile = fs.readFileSync(path.join(rootDir, `.${env}.env`))
    fs.writeFileSync(path.join(rootDir, '.env'), envFile)
  },
}
