const gulp = require('gulp')
const plumber = require('gulp-plumber')

gulp.task('includes', () => {
	return gulp.src('./development/includes/**/*')
	.pipe(plumber())
  .pipe(gulp.dest('./app/includes'))
})
