var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var ghPages = require('gulp-gh-pages');
var calManifest = require('gulp-cordova-app-loader-manifest');


// Import at the top of the file
var karma = require('karma').server;

/**
 * Test task, run test once and exit
 */
gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        //autoWatch: true,
        singleRun: true
    }, function () {
        done();
    });
});

var paths = {
    sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});


gulp.task('deploy', ['manifest'], function () {
    return gulp.src('./www/**/*')
        .pipe(ghPages({force: true}));
});

gulp.task('manifest', function () {
    return gulp.src(['./www/js/*', 'lib/ionic/js/ionic.bundle.js', 'lib/lodash/lodash.js'])
        .pipe(calManifest({
            load: [
                'js/cordova-app-loader-complete.js',
                'js/autoupdate.js',
                'lib/ionic/js/ionic.bundle.js',
                'lib/lodash/lodash.js',
                'js/app.js',
                'js/controllers.js',
                'js/services.js',
                'js/scale.service.js',
                'js/dash.controller.js',
                'js/portions-factory.service.js',
                'js/portions-prototype.service.js',
                'js/bluetooth.service.js']
        }))
        .pipe(gulp.dest('./www/'));
});