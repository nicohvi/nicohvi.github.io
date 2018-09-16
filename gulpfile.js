const gulp = require('gulp');
const R = require('ramda');
const b = require('browserify');
const w = require('watchify');
const { log, noop } = require('gulp-util');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const rev = require('gulp-rev');
const del = require('del');
const through = require('through2');
const fs = require('fs');
const vFile = require('vinyl-file');
const sourcemaps = require('gulp-sourcemaps');

const manifestPath = 'build/_data/assets.json';

// util

function error(err) {
  log(err);
  log(err.message);
}

function manifest(file, enc, cb) {
  const { path } = file;
  let old = {};

  const assetType = file.path.split('.').pop();

  vFile
    .read(manifestPath)
    .catch(err => log(err))
    .then(manifest => {
      try {
        old = JSON.parse(manifest.contents.toString());
      } catch (err) {}

      const contents = Object.assign(old, {
        [assetType]: path.split('/').pop()
      });
      fs.writeFileSync(manifestPath, JSON.stringify(contents));
      cb(null, file);
    });
}

// functions

function assets() {
  return gulp.src('assets/static/**').pipe(gulp.dest('build/public'));
}

function css() {
  const prod = process.env.NODE_ENV === 'production';

  function build() {
    log('Transpiling CSS');

    const opts = {
      errLogToConsole: true,
      outputStyle: 'expanded'
    };

    return gulp
      .src('assets/css/style.scss')
      .pipe(prod ? noop() : sourcemaps.init())
      .pipe(sass(opts).on('error', error))
      .pipe(prod ? noop() : sourcemaps.write())
      .pipe(prod ? gulp.dest('build/assets') : gulp.dest('build/public'))
      .on('end', () => log('CSS done'));
  }

  if (!prod) gulp.watch('assets/css/**/*.scss', build);

  return build();
}

function js() {
  const prod = process.env.NODE_ENV === 'production';

  const opts = {
    entries: ['assets/js/main.js'],
    debug: !prod,
    transform: ['babelify']
  };

  const bundler = !prod
    ? w(b(R.merge(opts, { cache: {}, packageCache: {} })))
    : b(opts);

  function build() {
    log('Transpiling JS');

    return bundler
      .bundle()
      .on('error', error)
      .pipe(source('app.js'))
      .pipe(prod ? gulp.dest('build/assets') : gulp.dest('build/public'))
      .on('end', () => log('JS done'));
  }

  if (!prod) bundler.on('update', build);
  return build();
}

function revision() {
  return gulp
    .src(['build/assets/app.js', 'build/assets/style.css'])
    .pipe(rev())
    .pipe(gulp.dest('build/public'))
    .pipe(through.obj(manifest))
    .on('end', () => del('build/assets'));
}

// tasks

// atomic
gulp.task('assets', assets);
gulp.task('css', css);
gulp.task('js', js);

// task flows
gulp.task('build', ['assets', 'css', 'js'], revision);
gulp.task('default', ['css', 'js'], () => {
  try {
    const devManifest = {
      js: 'app.js',
      css: 'style.css'
    };
    fs.writeFileSync(manifestPath, JSON.stringify(devManifest));
  } catch (err) {}
});
