/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const { task, series } = require('gulp')
const watch = require('gulp-watch')

const watchForChanges = (cb) => {
  watch('src/*', series('transpile'))

  return cb()
}

task('watch', watchForChanges)

exports.watchForChanges = watchForChanges
