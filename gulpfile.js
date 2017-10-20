require('./tasks/styles')
require('./tasks/javascript')
require('./tasks/includes')

const electron = require('electron')
const childProcess = require('child_process')
const gulp = require('gulp')

gulp.task('bundle', ['sass', 'javascript', 'includes'])
gulp.task('watch', ['sass:watch', 'js:watch'])

gulp.task('compile', ['bundle', 'watch'], () => {
	childProcess.spawn(electron, ['.'], {stdio: 'inherit'})
		.on('close', () => {
			process.exit()
		})
})
