var gulp = require('gulp')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('scenery', function() {
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
    './development/js/render.js'
  ])
    .pipe(sourcemaps.init())
      .pipe(concat('main.js'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./app'))
})

gulp.task('utilities', function() {
  return gulp.src([
    './development/js/slider.js',
    './development/js/flaggerMove.js',
    './development/js/flaggerClick.js',
    './development/js/flaggerRelease.js',
    './development/js/flagger.js',
    './development/js/sign.js',
    './development/js/input.js'
  ])
    .pipe(sourcemaps.init())
      .pipe(concat('utilities.js'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./app'))
})

gulp.task('javascript', ['scenery', 'utilities'])

gulp.task('javascript:watch', function () {
  gulp.watch('./development/js/**/*.js', ['javascript'])
})
