const gulp = require('gulp')
const concat = require('gulp-concat')
const plumber = require('gulp-plumber')
const optimizejs = require('gulp-optimize-js')
const uglifyjs = require('uglify-es')
const rename = require('gulp-rename')
const composer = require('gulp-uglify/composer')

const uglify = composer(uglifyjs, console)

gulp.task('javascript', () => {
	return gulp.src([
		'./development/includes/three.min.js',
		'./development/includes/OrbitControls.js',
		'./development/includes/threex.dynamictexture.js',
		'./development/js/materials.js',
		'./development/js/init.js',
		'./development/js/road.js',
		'./development/js/backhoe.js',
		'./development/js/truck.js',
		'./development/js/workers.js',
		'./development/js/render.js',
		'./development/js/slider.js',
		'./development/js/arrow.js',
		'./development/js/flaggerMove.js',
		'./development/js/flaggerClick.js',
		'./development/js/flaggerRelease.js',
		'./development/js/flagger.js',
		'./development/js/sign.js',
		'./development/js/input.js'
	])
		.pipe(plumber())
		.pipe(concat('bundled.js'))
		.pipe(uglify())
    .pipe(optimizejs())
		.pipe(rename('bundled.min.js'))
		.pipe(gulp.dest('./app'))
})

gulp.task('js:watch', () => {
	gulp.watch('./development/js/**/*.js', ['javascript'])
})
