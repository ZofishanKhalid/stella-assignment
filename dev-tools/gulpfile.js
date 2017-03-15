// --------------------------------------------------
// [Gulpfile]
// --------------------------------------------------

'use strict';

var gulp = require('gulp'),
    changed = require('gulp-changed'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    htmlhint = require('gulp-htmlhint'),
    browserSync = require('browser-sync').create();

// Gulp plumber error handler
function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}


// --------------------------------------------------
// [Libraries]
// --------------------------------------------------

// Minify CSS
gulp.task('minify-css', function() {
    // Theme
    gulp.src(['../app/assets/css/custom.css', '!../app/assets/css/custom.min.css'])
        .pipe(cleanCSS({ debug: true }, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('../app/assets/css/'));
});

// Minify JS - Minifies JS
gulp.task('uglify', function(cb) {
    pump([
            gulp.src(['../app/assets/js/**/*.js', '!../app/assets/**/*.min.js']),
            uglify(),
            rename({ suffix: '.min' }),
            gulp.dest('../app/assets/js/')
        ],
        cb
    );
});

// Htmlhint - Validate HTML
gulp.task('htmlhint', function() {
    gulp.src('../app/templates/*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
        .pipe(htmlhint.failReporter({ suppress: true }))
});

// tell browser where root of app is.
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: '../app'
        },
    })
})

// --------------------------------------------------
// [Gulp Task - Watch]
// --------------------------------------------------

// Lets us type "gulp" on the command line and run all of our tasks
gulp.task('default', ['browserSync', 'minify-css', 'htmlhint', 'watch']);

// This handles watching and running tasks
gulp.task('watch', function() {
    gulp.watch('../app/assets/**/*.scss', ['sass']);
    gulp.watch('../app/assets/css/custom.css', ['minify-css']);
    gulp.watch('../app/templates/*.html', ['htmlhint']);
    gulp.watch('../app/templates/*.html', browserSync.reload);
    gulp.watch('../app/assets/css/custom.css', browserSync.reload);
    gulp.watch('../app/assets/js/**/*.js', browserSync.reload);
});