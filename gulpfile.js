// Requires
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del = require('del');

gulp.task('default', ['clean', 'lint', 'style:main'], function() {
  gulp.start('style:themes', 'script');
})

// Clean ALL distributed files
gulp.task('clean', function(cb) {
  del(['dist/css', 'dist/js', 'src/css'], cb);
});

// Compile all styles
gulp.task('style:main', function() {
  return sass('src/sass/opalbox.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('src/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss({ keepSpecialComments: '1' }))
    .pipe(gulp.dest('dist/css'));
});

// Compile themes
gulp.task('style:themes', ['style:all_themes'], function() {
  return sass('src/sass/themes', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('src/css/themes'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss({ keepSpecialComments: '1' }))
    .pipe(gulp.dest('dist/css/themes'));
});

// Compile and compress themes into a single file
gulp.task('style:all_themes', function() {
  return sass('src/sass/themes/', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('all_themes.css'))
    .pipe(gulp.dest('src/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss({ keepSpecialComments: '0' }))
    .pipe(gulp.dest('dist/css'));
});

// Compile javascript code
gulp.task('script', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint.reporter('default'))
    .pipe(concat('opalbox.jquery.min.js'))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('dist/js'));
});

// Check Javascript style
gulp.task('lint', function() {
  return gulp.src('./src/js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

// Perform tests. Now it's only run linter
gulp.task('test', ['lint'], function() {

});