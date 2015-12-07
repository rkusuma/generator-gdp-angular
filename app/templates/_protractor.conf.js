/**
 * Created by romy.kusuma on 12/7/2015.
 */
var glob = require('glob');
var seleniumPath = './node_modules/gulp-protractor/node_modules/protractor/selenium/';
var seleniumJarPath = seleniumPath + 'selenium-server-standalone-2.48.2.jar';

glob(seleniumPath + '*.jar',
    function(err, files) {
        seleniumJarPath = files[0];
    });

exports.config = {
    framework: 'jasmine',
    seleniumServerJar: seleniumJarPath,
    capabilities: {
        browserName: 'chrome'
    },
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
