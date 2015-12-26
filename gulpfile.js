var gulp = require('gulp');
// var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
    scripts: ['app/*.js', 
        'lib/**/*.js', 
        'node_modules/lodash/index.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/rxjs/observable/fromPromise.js',
        'node_modules/rxjs/operator/toPromise.js',
        'node_modules/rxjs/scheduler/FutureAction.js',
        'node_modules/rxjs/scheduler/QueueAction.js',
        'node_modules/rxjs/scheduler/QueueScheduler.js',
        'node_modules/rxjs/scheduler/queue.js',
        'node_modules/rxjs/subject/SubjectSubscription.js',
        'node_modules/rxjs/symbol/rxSubscriber.js',
        'node_modules/rxjs/util/SymbolShim.js',
        'node_modules/rxjs/util/noop.js',
        'node_modules/rxjs/util/root.js',
        'node_modules/rxjs/util/throwError.js',
        'node_modules/rxjs/util/tryOrOnError.js',
        'node_modules/rxjs/Observable.js',
        'node_modules/rxjs/Subject.js',
        'node_modules/rxjs/Subscriber.js',
        'node_modules/rxjs/Subscription.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/zone.js/dist/zone.js'
  ],
  htmls: ['index.html']
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
  return gulp.src(paths.scripts, {base:"."})
    .pipe(gulp.dest('build'));
});
gulp.task('htmls', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.htmls)
    .pipe(gulp.dest('build'));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'htmls']);
