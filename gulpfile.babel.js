const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const ngAnnotate = require('gulp-ng-annotate')
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const minifyCss = require('gulp-clean-css');
const mode = require('gulp-mode')();
const angularTemplateCache = require('gulp-angular-templatecache');
const path = require('path');
const gulpif = require('gulp-if');
const minifyHtml = require('gulp-minify-html');

const configuration = {
  paths: {
    src: {
      js: [
        'node_modules/sweetalert2/dist/sweetalert2.all.js',
        'node_modules/jquery/dist/jquery.slim.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-flash-alert/dist/angular-flash.js',
        'public/app.js',
        'public/utils/*.js',
        'public/services/*.js',
        'public/views/**/*.js',
        'public/angularTemplateCache.js',
      ],
      scss: ['public/common.scss','public/index.scss', 'public/**/*.scss'],
      css: ['node_modules/bootstrap/dist/css/bootstrap.css', 'node_modules/font-awesome/css/font-awesome.css'],
      htmlTemplates: ['public/views/**/*.html'],
      staticFiles: [
        'public/**/*.{eot,svg,ttf,woff,woff2,otf}',
        'node_modules/font-awesome/**/*.{eot,svg,ttf,woff,woff2,otf}',
        'public/**/*.{png,jpeg,jpg,svg}',
        'public/favicon.ico',
      ],
    },
  }
}

function bundleCss() {
  return gulp.src([...configuration.paths.src.scss, ...configuration.paths.src.css])
        .pipe(gulpif(/[.]scss$/, sass().on('error', sass.logError)))
        .pipe(mode.production(minifyCss()))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('public/dist/css'));
}

function bundleJs() {
  return gulp
        .src(configuration.paths.src.js)
        .pipe(plumber({
          errorHandler: notify.onError({
            message: 'Error'
          })
        }))
        .pipe(babel())
        .pipe(ngAnnotate())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.init())
        .pipe(mode.production(uglify({output: { comments: false }})))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/dist'))
}

function createAngularTemplateCache(){
  return gulp.src(configuration.paths.src.htmlTemplates, { base: path.join(__dirname, 'public')})
         .pipe(minifyHtml())
         .pipe(angularTemplateCache('angularTemplateCache.js', { standalone: true }))
         .pipe(gulp.dest('public'));
}

function copyFiles() {
  return  gulp.src(configuration.paths.src.staticFiles)
          .pipe(gulp.dest('public/dist'))
}

function minifyIndex() {
    return gulp.src('public/index.html')
           .pipe(minifyHtml())
           .pipe(gulp.dest('public/dist'));
}


exports.default = gulp.parallel( gulp.series(createAngularTemplateCache, bundleJs), minifyIndex, bundleCss, copyFiles)