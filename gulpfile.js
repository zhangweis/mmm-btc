var gulp = require('gulp');
var gulp_jspm = require('gulp-jspm');
// var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
    scripts: ['app/boot.js'
  ],
  lib: ['jspm_packages/system.js',
  'config.js',
  'jspm_packages/npm/reflect-metadata@0.1.2.js',
  
  ],
  htmls: ['index.html', 'app/**/*.html', 'app/**/*.tml']
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['build']);
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
      .pipe(gulp_jspm())
    .pipe(gulp.dest('build'));
});
gulp.task('lib', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.lib, {base:'.'})
    .pipe(gulp.dest('build'));
});

gulp.task('htmls', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.htmls, {base:"."})
    .pipe(gulp.dest('build'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'lib', 'htmls']);