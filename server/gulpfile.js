var gulp = require('gulp');
var gutil= require('gulp-util');
var coffee = require('gulp-coffee');
var sass = require('gulp-sass');
var bower = require('gulp-bower')

js_files = [
  './js/*.coffee',
  './js/**/*.coffee',
  './js/**/**/*.coffee'
]

css_files = './styles/*.scss'

gulp.task('coffee', function() {
  gulp.src(js_files)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./static/js/'))
});

gulp.task('sass', function() {
  return gulp.src(css_files)
    .pipe(sass({ errLogToConsole: true }).on('error', gutil.log))
    .pipe(gulp.dest('./static/css/'))
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('static/js/lib/'))
});


gulp.task('watch', function() {
  gulp.watch(js_files, ['coffee']);
  gulp.watch(css_files, ['sass']);
});
