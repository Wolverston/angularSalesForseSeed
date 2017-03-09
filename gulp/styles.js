'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify'),
    prefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-minify-css');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles-reload', ['styles'], function() {
  return buildStyles()
    .pipe(browserSync.stream());
});

gulp.task('styles', function() {
  return buildStyles();
});

gulp.task('sass', function () {
  return buildSass();
});

gulp.task('sass-reload', ['sass'], function() {
  return buildSass()
    .pipe(browserSync.stream());
});

gulp.task('scss', function () {
  return buildSCSS();
});

gulp.task('scss-reload', ['scss'], function() {
  return buildSCSS()
    .pipe(browserSync.stream());
});

var buildSass = function() {
  var sassStyles = gulp.src(path.join(conf.paths.src, '/app/sass/style.sass'))
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cssmin());
  return sassStyles.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/css/')));
}

var buildSCSS = function() {
  var SCSSStyles = gulp.src(path.join(conf.paths.src, '/app/scss/style.scss'))
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cssmin());
  return SCSSStyles.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/css/')));
}

var buildStyles = function() {
  var lessOptions = {
    options: [
      'bower_components',
      path.join(conf.paths.src, '/app/css')
    ]
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/app/**/*.less'),
    path.join('!' + conf.paths.src, '/app/index.less')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };


  var styles = gulp.src([
    path.join(conf.paths.src, '/app/index.less')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.sourcemaps.init())
    .pipe($.less(lessOptions)).on('error', conf.errorHandler('Less'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write());

  if(conf.environment === 'release') {
    styles.pipe($.replace('../../bower_components/fontawesome/fonts/', '../fonts/'))
      .pipe($.replace('../../bower_components/bootstrap/fonts/', '../fonts/'));
  }

  return styles.pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/css/')));
};


