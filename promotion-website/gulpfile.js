var gulp        = require('gulp');
var sass        = require('gulp-sass');
var sassGlob    = require('gulp-sass-glob');
var cleanCSS    = require('gulp-clean-css');

gulp.task('css', function () {
    return gulp.src('src/components/_app/index.scss')
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('public/css'))
});
 
gulp.task('sass', () => 
  gulp.src('src/0_loader/main.scss')
  	.pipe(sassGlob())
    .pipe(sass())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('public/style'))
);

gulp.task('watch', function () {
    gulp.watch('src/components/**/_*.scss', ['css'])
    gulp.watch('src/components/_app/index.scss', ['css'])
});

gulp.task('default', [
    'watch'
])