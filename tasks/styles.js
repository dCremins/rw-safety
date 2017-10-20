const gulp = require('gulp')
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')

gulp.task('sass', () => {
	return gulp.src('./development/scss/main.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('../app/maps'))
  .pipe(gulp.dest('./app'))
})

gulp.task('sass:watch', () => {
	gulp.watch('./development/scss/**/*.scss', ['sass'])
})
