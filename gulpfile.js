var gulp        = require('gulp'),
    connect     = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    plumber     = require('gulp-plumber'),
    postcss     = require('gulp-postcss'),
    babel       = require('gulp-babel'),
    sourcemaps  = require('gulp-sourcemaps');


// create a task to serve the app
gulp.task('serve', function() {
    browserSync({
                    server: {
                        baseDir: "./public"
                    },
                    browser: 'Google Chrome'
                });
});

gulp.task('reload', function(){
    browserSync.reload();
});

gulp.task("brows",['serve'], function() {
    gulp.watch([
                   './public/**/*.html',
                   './public/**/*.js',
                   './public/**/*.css'
               ],
               ['reload']);
});

var browsers = [
    'ie 10'
];

gulp.task("sass", function(){
    gulp.src('./resources/assets/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(postcss([
                          require('doiuse')({browsers: browsers}),
                          require('autoprefixer')({browsers: browsers}),
                          require('css-mqpacker')
                      ]))
        .pipe(sourcemaps.write('./public/css'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('babel', function() {
    gulp.src('./resources/assets/js/**/*.es6')
        .pipe(plumber())
        .pipe(babel({
                        presets: ['es2015']
                    }))
        .pipe(gulp.dest('./public/js'));
});


