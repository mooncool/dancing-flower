/**
 * @author Moon
 */
'use strict';

const PROJECT_NAME = 'dancing-flower';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');

var paths = {
    js: 'js',
    scss: 'scss',
    fonts: 'fonts',
    demo: 'demo',
    dist: 'dist'
};

gulp.task('build:css', function() {
    return gulp.src(paths.scss + '/dancing-flower.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({
            basename: PROJECT_NAME,
            extname: '.css'
        }))
        .pipe(gulp.dest(paths.dist + '/css'))
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist + '/css'));
});

gulp.task('build:fonts', function() {
    return gulp.src(paths.fonts + '/**/*')
        .pipe(gulp.dest(paths.dist + '/fonts'));
});

gulp.task('build:html', function() {
    return gulp.src(paths.demo + '/**/*.html')
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build:js', function() {
    return gulp.src(paths.js + '/**/*.js')
        .pipe(concat(PROJECT_NAME + '.js'))
        .pipe(gulp.dest(paths.dist + '/js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('build', [
    'build:css',
    'build:fonts',
    'build:html',
    'build:js'
]);

gulp.task('clean', function () {
    return del(paths.dist);
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
