var gulp = require('gulp'),
	notify = require("gulp-notify"),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csso = require('gulp-csso'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename"),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	browserSync = require('browser-sync').create(),
	clean = require('gulp-dest-clean'),
	gulpSequence = require('gulp-sequence');

// Compile sass
gulp.task('styles', function () { 
  return gulp.src('./dev/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 4 versions']})) 
    .pipe(gulp.dest('./prod/css')) 
    .pipe(rename({suffix: '.min'}))
    .pipe(csso()) 
    .pipe(gulp.dest('./prod/css'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(browserSync.reload({stream: true}));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(['./dev/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./prod/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./prod/js/'))
        .pipe(notify({ message: 'Scripts task complete' }))
        .pipe(browserSync.reload({stream: true}));
});

// Minify images
gulp.task('images', () =>
    gulp.src('./dev/images/**/*.*')
        // .pipe(imagemin())
        .pipe(gulp.dest('./prod/images'))
);

/* Clean Prod Dir */
gulp.task('clean', function() {
    return gulp.src('./dev')
    	.pipe(clean('./prod'))
	    .pipe(notify({ message: 'Clean task complete' }));
});

// Browser sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Build
gulp.task('build', gulpSequence('clean', 'styles', 'scripts', 'images', 'browser-sync'));

/* Watcher */
gulp.task('watch', ['browser-sync'] ,function() {
    gulp.watch('./dev/sass/main.scss', ['styles', browserSync.reload]); // отслеживает изменение в файлах и автоматически начинает выполнение таска
    gulp.watch('./dev/js/main.js', ['scripts', browserSync.reload]);
    gulp.watch("*.html").on("change", browserSync.reload);
});