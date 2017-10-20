const electron = require('electron')
const childProcess = require('child_process')
const gulp = require('gulp')
const requireDir = require('require-dir')

requireDir('./tasks')

gulp.task('bundle', ['sass', 'javascript', 'includes'])
gulp.task('watch', ['sass:watch', 'js:watch'])

gulp.task('compile', ['bundle', 'watch'], () => {
	childProcess.spawn(electron, ['.'], {stdio: 'inherit'})
		.on('close', () => {
			process.exitCode = 1
		})
})
