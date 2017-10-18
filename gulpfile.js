require('./tasks/styles')
require('./tasks/javascript')
require('./tasks/includes')

const gulp = require('gulp')
const childProcess = require('child_process')
const electron = require('electron')

gulp.task('bundle', ['sass', 'javascript', 'includes'])
gulp.task('watch', ['sass:watch', 'javascript:watch'])

gulp.task('compile', ['bundle', 'watch'], () => {
  childProcess.spawn(electron, ['.'], { stdio: 'inherit' })
  .on('close', () => {
    process.exit()
  })
})
