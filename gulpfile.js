const gulp = require('gulp');

// liveload
const connect = require('gulp-connect');

// es6 -> es5
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

// js minify
const uglify = require('gulp-uglify');

// sass -> css
const sass = require('gulp-ruby-sass');

// image minify
const smushit = require('gulp-smushit');

// html minify
const htmlmin = require('gulp-htmlmin');

const opts = {
  dist: './dist/',

  jsFiles: './src/js/*.js',
  distJs: './dist/js/',

  scssFiles: './src/scss/*.scss',
  distCss: './dist/css',

  imgFiles: './src/img/*.*',
  distImg: './dist/img/',

  htmlFiles: './src/html/*.html',
  distHtml: './',

  watchFiles: ['src/html/*.html', 'src/scss/*.scss', 'src/js/*.js', 'src/img/*.*'],
  watchTasks: ['babel', 'browserify', 'sass', 'img', 'html'],
};

gulp.task('connect', () => {
  connect.server({
    livereload: true,
  });
});

gulp.task('babel', () => {
  gulp.src(opts.jsFiles)
    .pipe(babel({
      presets: ['env'],
    }))
    .pipe(connect.reload())
    .pipe(uglify())
    .pipe(gulp.dest(opts.distJs));
});

gulp.task('browserify', () => {
  const b = browserify({
    entries: `${opts.distJs}app.js`,
  });
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(opts.distJs));
});

gulp.task('sass', () => (
  sass(opts.scssFiles, {
    style: 'compressed',
  })
    .pipe(connect.reload())
    .pipe(gulp.dest(opts.distCss))
));

gulp.task('img', () => {
  gulp.src(opts.imgFiles)
    .pipe(connect.reload())
    .pipe(smushit({
      verbose: true,
    }))
    .pipe(gulp.dest(opts.distImg));
});

gulp.task('html', () => {
  gulp.src(opts.htmlFiles)
    .pipe(connect.reload())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(opts.distHtml));
});

gulp.task('watch', () => {
  gulp.watch(
    [opts.watchFiles],
    [opts.watchTasks],
  );
});

gulp.task('default', ['html', 'connect', 'babel', 'browserify', 'sass', 'img', 'watch']);
