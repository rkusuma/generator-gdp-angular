/**
 * Created by romy.kusuma on 5/13/2015.
 */

module.exports = function() {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var report = './report/';
    var server = '/src/server/';
    var temp = './.tmp/';
    var root = './';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true})['js'];
    var cssExtension = '<% if (usingSass) { %>scss<% } else { %>less<% } %>';

    var config = {
        alljs: [
            './src/**/*.js',
            './*.js',
            '!./src/server/**/*.js'
        ],
        build: './build/',
        client: client,
        css: temp + 'styles/styles.css',
        fonts: [
            './bower_components/bootstrap/fonts/**/*.*',
            './bower_components/font-awesome/fonts/**/*.*',
            client + 'fonts/**/*.*'
        ],
        html: clientApp + '**/*.html',
        htmlTemplates: clientApp + '**/*.html',
        images: client + 'images/**/*.*',
        index: client + 'index.html',
        js: [
            client + 'helpers/*.js',
            temp + 'ngConstants.js',
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],
        less: client + 'styles/*.' + cssExtension,
        mainLess: client + 'styles/styles.' + cssExtension,
        root: root,
        server: server,
        temp: temp,
        report: report,

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        /**
         * configuration constant file
         */
        configurationConstant: {
            file: 'ngConstants.js'
        },

        /**
         * template cache
         */
        templateCache: {
            file: 'template.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'app/'
            }
        },
        browserReloadDelay: 1000,
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../../',
            exclude: [
                // add path to 3rd party library you want to exclude
                'bower_components/toastr/toastr.css'
            ]
        },
        packages: [
            './package.json',
            './bower.json'
        ],
        testLibraries: [
            'node_modules'
        ],
        specs: [clientApp + '**/*.spec.js'],
        e2eSpecs: [client + 'e2e/**/*.js'],

        /**
         * Karma and testing Settings
         */
        karma: {},
        specHelpers: [client + 'test-helpers/*.js'],

        /**
         * Node Settings
         */
        defaultPort: 7203,
        nodeServer: './src/server/app.js'
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            exclude: config.bower.exclude,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    config.karma = getKarmaOptions();

    return config;

    /////////////

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                config.specHelpers,
                bowerFiles,
                temp + config.configurationConstant.file,
                client + '**/*.module.js',
                client + '**/*.js',
                temp + config.templateCache.file
            ),
            exclude: [],
            html: {
                dir: report + 'html',
                reportName: 'report-test-summary'
            },
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    {type: 'html', subdir: 'report-html'},
                    {type: 'cobertura', subdir: 'report-cobertura', file: 'cobertura.txt'},
                    {type: 'text-summary'}
                ]
            },
            preprocessors: {}
        };

        options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];

        return options;
    }
};
