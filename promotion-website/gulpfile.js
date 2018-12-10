var gulp    = require('gulp');
var sass    = require('gulp-sass');
var sassGlob    = require('gulp-sass-glob');
var cleanCSS    = require('gulp-clean-css');

gulp.task('css', function () {
    return gulp.src('src/0_loader/main.scss')
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('public/style/'))
});

gulp.task('watch', function () {
    gulp.watch('src/**/**/_*.scss', ['css'])
});

gulp.task('default', [
    'watch'
])