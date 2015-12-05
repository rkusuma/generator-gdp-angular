/**
 * Created by romy.kusuma on 5/18/2015.
 */

/* jshint -W079 */
var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});

/**
 * Default task
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/**
 * Bump version
 */

gulp.task('bump', function() {
    var message = 'Bumping versions';
    var type = args.type || 'patch';
    var version = args.version;
    var options = {};

    if (version) {
        options.version = version;
        message += ' to ' + version;
    }
    else {
        options.type = type;
        message += ' for a ' + type;
    }

    log(message);

    gulp.src(config.packages)
    .pipe($.bump(options))
    .pipe(gulp.dest(config.root));
});

function log(msg) {
    if (typeof msg === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
