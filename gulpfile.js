const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-clean-css');
const mode = require('gulp-mode')();

function compileSass(){
    return gulp
      .src('./public/css/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./public/css'));
};

function bundleCss(){
  return gulp
    .src(['./node_modules/bootstrap/dist/css/bootstrap.css','./node_modules/bootstrap/dist/css/bootstrap-theme.css','./node_modules/font-awesome/css/font-awesome.css', './public/css/style.css'])
    .pipe(concat('bundle.css'))
    .pipe(mode.production(minifyCss()))
    .pipe(gulp.dest('./public/dist'));
}

function bundleJs(){
  return gulp.src(['./node_modules/jquery/dist/jquery.js', './node_modules/bootstrap/dist/js/bootstrap.js', './node_modules/angular/angular.js', './node_modules/angular-ui-router/release/angular-ui-router.js', './public/app.js', './public/js/**/*.js'])
  .pipe(mode.development(sourcemaps.write()))
  .pipe(concat('bundle.js'))
  .pipe(mode.production(uglify({ mangle: false })))
  .pipe(mode.development(sourcemaps.write()))
  .pipe(gulp.dest('./public/dist'));
}

function moveFonts(){
  return gulp
  .src('./node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest('./public/fonts'));
}

exports.build = gulp.parallel(moveFonts, gulp.series(compileSass, bundleCss), bundleJs);
exports.default = exports.build;


