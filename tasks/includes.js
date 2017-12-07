const gulp = require('gulp')
const plumber = require('gulp-plumber')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')

gulp.task('images', () => {
	return gulp.src('./development/includes/images/**/*')
	.pipe(plumber())
	.pipe(imagemin())
  .pipe(gulp.dest('./app/images'))
})

gulp.task('html', () => {
	return gulp.src('./development/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./app'))
})

gulp.task('html:watch', () => {
	gulp.watch('./development/**/*.html', ['html'])
})
