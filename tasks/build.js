/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const { dest, task } = require('gulp')
const ts = require('gulp-typescript')
const uglify = require('gulp-uglify')

const tsProject = ts.createProject('tsconfig.json')

// todo: add gulp concat
const build = () => tsProject.src()
  .pipe(tsProject())
  .pipe(uglify())
  .pipe(dest('dist'))

task('build', build)

exports.build = build
