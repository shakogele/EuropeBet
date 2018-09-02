var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var browsersync = require('browser-sync');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');

gulp.task('es6', function() {
    return gulp.src('main.js')
               .pipe(browserify({debug: true}))
               .pipe(babel({
                 presets:['@babel/env']
               }))
               .pipe(minify())
               .pipe(gulp.dest('dist/js'))
               .pipe(browsersync.stream());
});

gulp.task('sass', function() {
  return gulp.src(['src/scss/*.scss'])
             .pipe(sass())
             .pipe(autoprefixer({
                  browsers: ['last 5 versions'],
                  cascade: false
              }))
             .pipe(cleanCSS({compatibility: 'ie8'}))
             .pipe(gulp.dest('dist/css'))
             .pipe(browsersync.stream());
});

gulp.task('js', function() {
  return gulp.src([
                  'node_modules/jquery/dist/jquery.min.js',
                  'node_modules/popper.js/dist/umd/popper.min.js',
                  'node_modules/bootstrap/dist/js/bootstrap.min.js',
                  'node_modules/bootstrap-select/dist/js/bootstrap-select.min.js'
                ])
             .pipe(concat('bootstrap.js'))
             .pipe(gulp.dest('dist/js'))
             .pipe(browsersync.stream());
});

gulp.task('html', function() {
  return gulp.src(['src/index.html'])
             .pipe(gulp.dest('dist/'))
             .pipe(browsersync.stream());
});

gulp.task('fonts', function() {
  return gulp.src(['src/fonts/*'])
             .pipe(gulp.dest('dist/fonts'))
             .pipe(browsersync.stream());
});

gulp.task('images', function() {
  return gulp.src(['src/images/**/*'])
             .pipe(gulp.dest('dist/images'))
             .pipe(browsersync.stream());
});

gulp.task('serve', ['sass'], function() {

  browsersync.init({
    server: 'dist'
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch('src/*.html').on('change', browsersync.reload);

})

gulp.task('default', ['js', 'es6', 'html', 'images', 'fonts', 'serve']);
