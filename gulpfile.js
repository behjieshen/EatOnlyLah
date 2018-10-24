var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var sassGlob = require('gulp-sass-glob');
var uglify = require('gulp-babel-minify');

gulp.task('html', function() {
  return watch('src/views/*.pug', function() {
    gulp
      .src('src/views/*.pug')
      .pipe(pug({ pretty: true }))
      .pipe(gulp.dest('build/www'));
  });
});

gulp.task('css', function() {
  return watch('src/scss/**/*', function() {
    gulp
      .src('src/scss/main.scss')
      .pipe(sassGlob())
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(autoprefixer('last 2 versions'))
      .pipe(concat('main.css'))
      .pipe(gulp.dest('build/www/assets/stylesheets'));
  });
});

gulp.task('js', function() {
  return watch('src/scripts/**/*', function() {
    gulp
      .src('src/scripts/**/*')
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(gulp.dest('build/www/assets/scripts'));
  });
});

gulp.task('public', () => {
  return watch('public/*', function() {
    gulp.src('public/*').pipe(gulp.dest('build/public'));
  });
});

gulp.task('default', ['html', 'css', 'js']);
