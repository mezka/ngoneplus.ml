gulp.task('setup', [fonts])

//must run to setup font files for font-awesome

gulp.task('fonts', function() {
  return gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('public/fonts'))
});