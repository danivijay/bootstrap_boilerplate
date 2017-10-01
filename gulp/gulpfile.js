'use strict';

var gulp        = require('gulp'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
    prefix      = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    browserSync = require('browser-sync').create();

var css = [
  '../assets/css/bootstrap.min.css',
  '../assets/css/bootstrap-theme.min.css',
  '../assets/css/main.css'
];

var scripts = [
  '../assets/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js',
  '../assets/js/vendor/bootstrap.min.js',
  '../assets/js/main.js'
];

// Static Server + watching css/html files
gulp.task('serve', ['css', 'js'], function() {
    browserSync.init({
      server: '../',
      browser: "google chrome"
    });
    gulp.watch('../assets/css/**/*.css', ['css']);
    gulp.watch('../assets/js/**/*.js', ['js']);
    gulp.watch('../*.html').on('change', browserSync.reload);
});

// Configure CSS tasks.
gulp.task('css', function () {
  return gulp.src(css)
    .pipe(cssmin())
    .pipe(concat('main.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../dist/css'))
    .pipe(browserSync.stream());
});

// Configure JS.
gulp.task('js', function() {
  return gulp.src(scripts)
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch('../dist/css/**/*.css', ['css']);
  gulp.watch('../dist/js/**/*.js', ['js']);
  gulp.watch('../*.html').on('change', browserSync.reload);
});

gulp.task('default', ['css', 'js', 'serve']);
