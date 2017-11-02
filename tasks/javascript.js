const gulp = require('gulp')
const concat = require('gulp-concat')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const uglifyjs = require('uglify-es')
const composer = require('gulp-uglify/composer')

const uglify = composer(uglifyjs, console)

gulp.task('javascript', () => {
	return gulp.src([
		'./development/js/materials.js',
		'./development/js/init.js',
		'./development/js/road.js',
		'./development/js/trees.js',
		'./development/js/shop.js',
		'./development/js/apartments.js',
		'./development/js/bench.js',
		'./development/js/backhoe.js',
		'./development/js/truck.js',
		'./development/js/workers.js',
		'./development/js/render.js',
		'./development/js/slider.js',
		'./development/js/flaggerMove.js',
		'./development/js/flaggerClick.js',
		'./development/js/flaggerRelease.js',
		'./development/js/flagger.js',
		'./development/js/sign.js',
		'./development/js/input.js'
	])
		.pipe(plumber())
    .pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(rename('main.min.js'))
    .pipe(sourcemaps.write('../app/maps'))
		.pipe(gulp.dest('./app'))
})

gulp.task('js:watch', () => {
	gulp.watch('./development/js/**/*.js', ['javascript'])
})
