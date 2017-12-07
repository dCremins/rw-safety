const electron = require('electron')
const childProcess = require('child_process')
const gulp = require('gulp')
const requireDir = require('require-dir')

requireDir('./tasks')

gulp.task('bundle', ['sass', 'javascript', 'images', 'html'])
gulp.task('watch', ['sass:watch', 'js:watch', 'html:watch'])

gulp.task('compile', ['bundle', 'watch'], () => {
	childProcess.spawn(electron, ['.'], {stdio: 'inherit'})
		.on('close', () => {
			process.exitCode = 1
		})
})
