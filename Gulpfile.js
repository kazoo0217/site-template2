var gulp = require('gulp');

//config path
var paths = {
  scss: 'scss/**/*.scss',
  css: 'css/**/*.css',
};

//sass compile
gulp.task('sass', function () {
  var sass = require('gulp-sass');

  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./css'));
});

//postcss
gulp.task('autoprefixer', function () {
  var postcss = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');
  var autoprefixer = require('autoprefixer-core');

  return gulp.src('./css/style.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'));
});

//local web server and auto reload
gulp.task('webserver', function() {
  var webserver = require('gulp-webserver');

  return gulp.src('.')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

//watch
gulp.task('watch', function() {
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.css, ['autoprefixer']);
});

//default task
gulp.task('default', ['webserver', 'watch', 'autoprefixer']);
