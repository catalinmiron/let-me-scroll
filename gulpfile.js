/*******************************************************************************
1. DEPENDENCIES
*******************************************************************************/

var gulp = require('gulp');                             // gulp core
    sass = require('gulp-sass'),                        // sass compiler
    uglify = require('gulp-uglify'),                    // uglifies the js
    jshint = require('gulp-jshint'),                    // check if js is ok
    rename = require("gulp-rename");                    // rename files
    concat = require('gulp-concat'),                    // concatinate js
    notify = require('gulp-notify'),                    // send notifications to osx
    plumber = require('gulp-plumber'),                  // disable interuption
    stylish = require('jshint-stylish'),                // make errors look good in shell
    minifycss = require('gulp-minify-css'),             // minify the css files
    browserSync = require('browser-sync'),              // inject code to all devices
    autoprefixer = require('gulp-autoprefixer'),        // sets missing browserprefixes
    runSequence = require('run-sequence');


/*******************************************************************************
2. FILE DESTINATIONS (RELATIVE TO ASSSETS FOLDER)
*******************************************************************************/

var target = {
    sass_src : 'scss/**/*.scss',                        // all sass files
    style: 'scss/style.scss',                           // take only style.scss
    css_dest : 'css',                                   // where to put minified css
    js_lint_src : [                                     // all js that should be linted
        'js/build/custom/scripts.js'
    ],
    js_concat_src : [                                   // all js files that should be concatinated
        'js/build/vendor/*',
        'js/build/custom/scripts.js'
    ],
    js_dest : 'js/'                                     // where to put minified js
};


/*******************************************************************************
3. SASS TASK
*******************************************************************************/

gulp.task('sass', function() {
    gulp.src(target.sass_src)                           // get the files
        .pipe(plumber())                                // make sure gulp keeps running on errors
        .pipe(sass())                                   // compile all sass
        .pipe(autoprefixer(                             // complete css with correct vendor prefixes
            'last 2 version',
            '> 1%',
            'ie 8',
            'ie 9',
            'ios 6',
            'android 4'
        ))
        .pipe(minifycss())                              // minify css
        .pipe(gulp.dest(target.css_dest))               // where to put the file
        .pipe(notify({message: '<%= file.relative %> processedeeed'}));    // notify when done
});

gulp.task('style', function() {
    gulp.src(target.style)                           // get the files
        .pipe(plumber())                                // make sure gulp keeps running on errors
        .pipe(sass())                                   // compile all sass
        .pipe(autoprefixer(                             // complete css with correct vendor prefixes
            'last 2 version',
            '> 1%',
            'ie 8',
            'ie 9',
            'ios 6',
            'android 4'
        ))
        // .pipe(minifycss())                              // minify css
        .pipe(gulp.dest(target.css_dest))               // where to put the file
        .pipe(notify({message: '<%= file.relative %> processed'}));    // notify when done
});


/*******************************************************************************
4. JS TASKS
*******************************************************************************/

// lint my custom js
gulp.task('js-lint', function() {
    gulp.src(target.js_lint_src)                        // get the files
        .pipe(jshint())                                 // lint the files
        .pipe(jshint.reporter(stylish))                 // present the results in a beautiful way
});

// minify & concatinate all other js
gulp.task('js-concat', function() {
    gulp.src(target.js_concat_src)                      // get the files
        // .pipe(uglify())                              // uglify the files
        .pipe(concat('app.js'))                         // concatinate to one file
        .pipe(gulp.dest(target.js_dest))                // where to put the files
        .pipe(notify({message: 'JS processed!'}));      // notify when done
});


/*******************************************************************************
5. BROWSER SYNC
*******************************************************************************/

gulp.task('browser-sync', function() {
    browserSync.init(['css/*.*', 'js/*.*', '*.html'], {        // files to inject
        server: {
            baseDir: './'
        }
    });
});


/*******************************************************************************
1. GULP TASKS
*******************************************************************************/

gulp.task('default', function(callback) {
    runSequence(
        'sass',
        'style',
        'js-lint',
        'js-concat',
        'browser-sync',
        callback
    );
    gulp.watch(target.style, function() {
        gulp.run('style');
    });
    gulp.watch(target.js_lint_src, function() {
        gulp.run('js-lint');
    });
    gulp.watch(target.js_minify_src, function() {
        gulp.run('js-uglify');
    });
    gulp.watch(target.js_concat_src, function() {
        gulp.run('js-concat');
    });
});
