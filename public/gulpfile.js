var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('css', function(){
    return gulp.src('./css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('css:watch', function(){
    gulp.watch('./css/**/*.scss', ['css']);
});


gulp.task('build', function(){
    return gulp.src(['./node_modules/jquery/dist/jquery.js', './node_modules/bootstrap/js/bootstrap.js', './node_modules/angular/angular.js', './node_modules/angular-ui-router/release/angular-ui-router.js', './app.js', './js/**/*.js'])
    .pipe(sourcemaps.write())
    .pipe(concat('bundle.js'))
    //only uglify if task is run with --type production
    .pipe(gutil.env.type === 'production'? uglify({ mangle: false }) : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/'));
})

gulp.task('build:watch', function(){
    gulp.watch('./js/**/*.js', ['build']);
})