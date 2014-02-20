var gulp = require('gulp');
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    lr = require('tiny-lr'),
    livereload = require('gulp-livereload'),
    server = lr();

gulp.task('styles', function() {
  gulp.src('scss/style.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 8', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('watch', function() {
    server.listen(35729, function (err) {
        if (err) {
            return console.log(err)
        };

        // Watch .scss files
        gulp.watch('scss/**/*.scss', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('styles');
        });
    });
});