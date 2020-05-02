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

const configuration = {
  paths: {
    src: {
      js: [
        'public/vendor/js/jquery.slim.js',
        'public/vendor/js/sweetalert2.all.js',
        'public/vendor/js/bootstrap.bundle.js',
        'public/vendor/js/angular.js',
        'public/vendor/js/angular-animate.js',
        'public/vendor/js/angular-ui-router.js',
        'node_modules/angular-flash-alert/dist/angular-flash.js',
        'public/angularTemplateCache.js',
        'public/utils/**/*.js',
        'public/app.js',
        'public/services/*.js',
        'public/views/**/*.js',
      ],
      scss: ['public/**/*.scss'],
      fonts: [
        'public/fonts/*.eot',
        'public/fonts/*.svg',
        'public/fonts/*.ttf',
        'public/fonts/*.woff',
        'public/fonts/*.woff2',
      ],
      css: ['public/vendor/css/*.css'],
      htmlTemplates: ['public/views/**/*.html'],
      images: ['public/img/**/*']
    },
    vendor: {
      src: {
        js: [
          'node_modules/sweetalert2/dist/sweetalert2.all.js',
          'node_modules/jquery/dist/jquery.slim.js',
          'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
          'node_modules/angular-animate/angular-animate.js',
          'node_modules/angular-ui-router/release/angular-ui-router.js',
          'node_modules/angular-flash-alert/dist/angular-flash.js',
          'node_modules/angular/angular.js',
        ],
        css: [
          'node_modules/bootstrap/dist/css/bootstrap.css',
          'node_modules/font-awesome/css/font-awesome.css',
        ],
        fonts: 'node_modules/font-awesome/fonts/fontawesome-webfont.woff2',
      },
    },
  }
}

function copyVendorJs() {
  return gulp
    .src(configuration.paths.vendor.src.js)
    .pipe(gulp.dest('public/vendor/js'));
}

function copyVendorCss() {
  return gulp
    .src(configuration.paths.vendor.src.css)
    .pipe(gulp.dest('public/vendor/css'));
}

function copyVendorFonts() {
  return gulp
    .src(configuration.paths.src.fonts)
    .pipe(gulp.dest('public/fonts'));
}

function bundleCss() {
  return gulp
    .src([...configuration.paths.src.scss, ...configuration.paths.src.css])
    .pipe(gulpif(/[.]scss$/, sass().on('error', sass.logError)))
    .pipe(mode.production(minifyCss()))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/css'));
}

function bundleJs() {
  return gulp.src(configuration.paths.src.js)
    .pipe(plumber({
      errorHandler: notify.onError({
        message: 'Error'
      })
    }))
    .pipe(concat('bundle.js'))
    .pipe(babel())
    .pipe(ngAnnotate())
    .pipe(sourcemaps.init())
    .pipe(mode.production(uglify({output: { comments: false }})))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public'))
}

function createAngularTemplateCache(){
  return gulp.src(configuration.paths.src.htmlTemplates, { base: path.join(__dirname, 'public')})
  .pipe(angularTemplateCache('angularTemplateCache.js', { standalone: true }))
  .pipe(gulp.dest('public'));
}

function copyFolders() {
  return gulp
    .src([...configuration.paths.src.fonts, ...configuration.paths.src.images, 'public/css/*.css'], { base: path.join(__dirname, 'public') })
    .pipe(gulp.dest('public/dist'))
}

function copyFiles() {
  return gulp
    .src(['public/index.html', 'public/bundle.js', 'public/bundle.js.map'])
    .pipe(gulp.dest('public/dist'))
}

function watchFiles() {
  gulp.watch(configuration.paths.src.scss, gulp.series(bundleCss, copyFiles));
  gulp.watch(configuration.paths.src.htmlTemplates, gulp.series(createAngularTemplateCache, bundleJs, copyFiles))
  gulp.watch(configuration.paths.src.js, gulp.series(bundleJs, copyFiles));
  gulp.watch([...configuration.paths.src.images, ...configuration.paths.src.fonts], copyFolders);
}

exports.build = gulp.series(
  gulp.parallel(
    copyVendorFonts,
    gulp.series(copyVendorCss, bundleCss),
    gulp.series(copyVendorJs, createAngularTemplateCache, bundleJs)
  ),
  gulp.parallel(copyFolders, copyFiles)
);
exports.watch = watchFiles;
exports.default = exports.build;


