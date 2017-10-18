var gulp = require('gulp')

gulp.task('includes', function() {
  return gulp.src('./development/includes/**/*')
    .pipe(gulp.dest('./app/includes'))
})
