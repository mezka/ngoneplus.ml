const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-clean-css');
const mode = require('gulp-mode')();
const angularTemplateCache = require('gulp-angular-templatecache');
const path = require('path');

const configuration = {
  paths: {
    src: {
      js: [
        './public/vendor/js/jquery.slim.js',
        './public/vendor/js/sweetalert2.all.js',
        './public/vendor/js/bootstrap.bundle.js',
        './public/vendor/js/angular.js',
        './public/vendor/js/angular-animate.js',
        './public/vendor/js/angular-ui-router.js',
        './node_modules/angular-flash-alert/dist/angular-flash.js',
        './public/angularTemplateCache.js',
        './public/app.js',
        './public/services/*.js',
        './public/views/**/*.js',
      ],
      scss: ['./public/index.scss', './public/**/*.scss'],
      fonts: [
        './public/fonts/*.eot',
        './public/fonts/*.svg',
        './public/fonts/*.ttf',
        './public/fonts/*.woff',
        './public/fonts/*.woff2',
      ],
      css: ['./public/vendor/css/*.css', './public/compiledUserStyles.css'],
      htmlTemplates: ['./public/views/**/*.html'],
      images: ['./public/img/**/*']
    },
    vendor: {
      src: {
        js: [
          './node_modules/sweetalert2/dist/sweetalert2.all.js',
          './node_modules/jquery/dist/jquery.slim.js',
          './node_modules/bootstrap/dist/js/bootstrap.bundle.js',
          './node_modules/angular-animate/angular-animate.js',
          './node_modules/angular-ui-router/release/angular-ui-router.js',
          './node_modules/angular-flash-alert/dist/angular-flash.js',
          './node_modules/angular/angular.js',
        ],
        css: [
          './node_modules/bootstrap/dist/css/bootstrap.css',
          './node_modules/font-awesome/css/font-awesome.css',
        ],
        fonts: './node_modules/font-awesome/fonts/fontawesome-webfont.woff2',
      },
    },
  }
}

function copyVendorJs() {
  return gulp
    .src(configuration.paths.vendor.src.js)
    .pipe(gulp.dest('./public/vendor/js'));
}

function copyVendorCss() {
  return gulp
    .src(configuration.paths.vendor.src.css)
    .pipe(gulp.dest('./public/vendor/css'));
}

function copyVendorFonts() {
  return gulp
    .src(configuration.paths.src.fonts)
    .pipe(gulp.dest('./public/fonts'));
}

function compileSass() {
  return gulp
    .src(configuration.paths.src.scss)
    .pipe(concat('compiledUserStyles.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
};

function bundleCss() {
  return gulp
    .src(configuration.paths.src.css)
    .pipe(concat('style.css'))
    .pipe(mode.production(minifyCss()))
    .pipe(gulp.dest('./public'));
}

function bundleJs() {
  return gulp.src(configuration.paths.src.js)
    .pipe(mode.development(sourcemaps.write()))
    .pipe(concat('bundle.js'))
    .pipe(mode.production(uglify({ mangle: false })))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(gulp.dest('./public'));
}

function createAngularTemplateCache(){
  return gulp.src(configuration.paths.src.htmlTemplates, { base: path.join(__dirname, 'public')})
  .pipe(angularTemplateCache('angularTemplateCache.js', { standalone: true }))
  .pipe(gulp.dest('./public'));
}

function copyFolders() {
  return gulp
    .src([...configuration.paths.src.fonts, ...configuration.paths.src.images], { base: path.join(__dirname, 'public') })
    .pipe(gulp.dest('./public/dist'))
}

function copyFiles() {
  return gulp
    .src(['./public/index.html', './public/bundle.js', './public/style.css', ])
    .pipe(gulp.dest('./public/dist'))
}

function watchFiles() {
  gulp.watch(configuration.paths.src.scss, gulp.series(compileSass, bundleCss, copyFiles));
  gulp.watch(configuration.paths.src.htmlTemplates, gulp.series(createAngularTemplateCache, bundleJs, copyFiles))
  gulp.watch(configuration.paths.src.js, gulp.series(bundleJs, copyFiles));
  gulp.watch([...configuration.paths.src.images, ...configuration.paths.src.fonts], copyFolders);
}

exports.build = gulp.series(
  gulp.parallel(
    copyVendorFonts,
    gulp.series(compileSass, copyVendorCss, bundleCss),
    gulp.series(copyVendorJs, createAngularTemplateCache, bundleJs)
  ),
  gulp.parallel(copyFolders, copyFiles)
);
exports.watch = watchFiles;
exports.default = exports.build;


