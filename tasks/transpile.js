/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const { dest, task } = require('gulp')
const ts = require('gulp-typescript')

const tsProject = ts.createProject('tsconfig.json')

const transpile = () => tsProject.src()
  .pipe(tsProject())
  .pipe(dest('dist'))

task('transpile', transpile)

exports.transpile = transpile
