var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

//must run to setup font files for font-awesome

gulp.task('setup', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./fonts'))
})

gulp.task('scss:compile', function(){
    return gulp.src(['./css/style.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('buildcss', ['scss:compile'], function(){
    return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css','./node_modules/bootstrap/dist/css/bootstrap-theme.css','./node_modules/font-awesome/css/font-awesome.css', './css/style.css'])
    .pipe(concat('bundle.css'))
    .pipe(gutil.env.type === 'production'? minifyCss(): gutil.noop())
    .pipe(gulp.dest('./dist'));
});


gulp.task('buildcss:watch', function(){
    gulp.watch('./css/style.scss', ['buildcss']);
});


gulp.task('buildjs', function(){
    return gulp.src(['./node_modules/jquery/dist/jquery.js', './node_modules/bootstrap/js/bootstrap.js', './node_modules/angular/angular.js', './node_modules/angular-ui-router/release/angular-ui-router.js', './app.js', './js/**/*.js'])
    .pipe(sourcemaps.write())
    .pipe(concat('bundle.js'))
    //only uglify if task is run with --type production
    .pipe(gutil.env.type === 'production'? uglify({ mangle: false }) : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
})

gulp.task('buildjs:watch', function(){
    gulp.watch(['./app.js', './js/**/*.js'], ['build']);
})

gulp.task('dev', function(){
    gulp.watch(['./app.js', './js/**/*.js'], ['build']);
    gulp.watch('./css/style.scss', ['buildcss']);
})
