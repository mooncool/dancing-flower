/**
 * @author Moon
 */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var del = require('del');

var paths = {
    js: 'js',
    scss: 'scss',
    fonts: 'fonts',
    dist: 'dist'
};

gulp.task('build:css', function() {
    return gulp.src(paths.scss + '/dancing-flower.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({
            basename: 'dancing-flower',
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

gulp.task('build', [
    'build:css',
    'build:fonts'
]);

gulp.task('clean', function () {
    return del(paths.dist);
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
