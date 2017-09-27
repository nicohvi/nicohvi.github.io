const gulp = require('gulp');
const R = require('ramda');
const b = require('browserify');
const w = require('watchify');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const min = require('gulp-imagemin');

// util

function error (err) {
  gutil.log(err.message);
}

// functions

function assets () {
  gulp.src(['assets/static/**', '!assets/static/images'])
  .pipe(gulp.dest('build/public'))

  gulp.src('assets/static/images/**')
  .pipe(min())
  .pipe(gulp.dest('build/public'));
}

function css (watch = false) {
  const prod = process.env.NODE_ENV === 'production';

  function build () {
    const start = Date.now();

    gutil.log("Transpiling CSS");

    const opts = {
      errLogToConsole: true,
      outputStyle: 'expanded'
    };

    gulp.src('assets/css/style.scss')
    .pipe(sass(opts).on('error', error))
    .pipe(gulp.dest('build/public'))
    .on('end', () => gutil.log("CSS done"));
  }

  if(watch) gulp.watch('assets/css/**/*.scss', build);

  build();
}

function js (watch = false) {
  const prod = process.env.NODE_ENV === 'production';

  const opts = {
    entries: ['assets/js/main.js'],
    debug: !prod,
    transform: ['babelify']
  }

  const bundler = watch ?
  w(b(R.merge(opts, { cache: {}, packageCache: {} })))
  : b(opts);

  function build () {
    const start = Date.now();

    gutil.log("Transpiling JS");

    bundler
    .bundle()
    .on('error', error)
    .pipe(source('app.js'))
    .pipe(gulp.dest('build/public'))
    .on('end', () => gutil.log('JS done'));
  }

  bundler.on('update', build);
  build();
}

// tasks

gulp.task('assets', assets);

gulp.task('watch', () => {
  js(true);
  css(true);
});

gulp.task('default', ['watch'])