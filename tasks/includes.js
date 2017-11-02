const gulp = require('gulp')
const plumber = require('gulp-plumber')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const uglifyjs = require('uglify-es')
const composer = require('gulp-uglify/composer')

gulp.task('images', () => {
	return gulp.src('./development/includes/images/**/*')
	.pipe(plumber())
  .pipe(gulp.dest('./app/images'))
})

const uglify = composer(uglifyjs, console)

gulp.task('includes', () => {
	return gulp.src([
		'./development/includes/three.min.js',
		'./development/includes/OrbitControls.js',
		'./development/includes/threex.dynamictexture.js'
	])
		.pipe(plumber())
    .pipe(sourcemaps.init())
		.pipe(concat('includes.js'))
		.pipe(uglify())
		.pipe(rename('includes.min.js'))
    .pipe(sourcemaps.write('../app/maps'))
		.pipe(gulp.dest('./app'))
})
