/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const { series } = require('gulp')
require('./tasks/build')

exports.default = series('build')
