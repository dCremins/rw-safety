const gulp = require('gulp')
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
const gutil = require('gulp-util')

gulp.task('sass', () => {
	return gulp.src('./development/scss/main.scss')
  .pipe(plumber())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('./app'))
})

gulp.task('sass:watch', () => {
	gulp.watch('./development/scss/**/*.scss', ['sass'], () => {
		gutil.log('Watch Triggered')
	})
})
