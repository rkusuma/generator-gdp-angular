/**
 * Created by romy.kusuma on 12/4/2015.
 */
'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = generators.Base.extend({
    _scaffoldFolders: function() {
        this.log('Creating project file system...');
        mkdirp('/src');
        mkdirp('/src/client');
        mkdirp('/src/client/app');
        mkdirp('/src/client/fonts');
        mkdirp('/src/server');
    },
    _packageFiles: function(sourceRoot, destinationRoot) {
        var templateContext = {
            appName: this.appName,
            appDescription: this.appDescription,
            appVersion: this.appVersion,
            usingSass: this.usingSass
        };
        this.log('Copying package files...');

        this.fs.copy(sourceRoot + '/bowerrc', destinationRoot + '/.bowerrc');
        this.fs.copyTpl(sourceRoot + '/_bower.json', destinationRoot + '/bower.json', templateContext);
        this.fs.copy(sourceRoot + '/jshintrc', destinationRoot + '/.jshintrc');
        this.fs.copy(sourceRoot + '/jscsrc', destinationRoot + '/.jscsrc');
        this.fs.copy(sourceRoot + '/gitignore', destinationRoot + '/.gitignore');
        this.fs.copyTpl(sourceRoot + '/_README.md', destinationRoot + '/README.md', templateContext);
        this.fs.copyTpl(sourceRoot + '/_gulpfile.js', destinationRoot + '/gulpfile.js', templateContext);
        this.fs.copyTpl(sourceRoot + '/_gulp.config.js', destinationRoot + '/gulp.config.js', templateContext);
        this.fs.copy(sourceRoot + '/_karma.conf.js', destinationRoot + '/karma.conf.js');
        this.fs.copyTpl(sourceRoot + '/_package.json', destinationRoot + '/package.json', templateContext);
        this.fs.copy(sourceRoot + '/_config.json', destinationRoot + '/config.json');
    },
    _appFiles: function(sourceRoot, destinationRoot) {
        this.log('Copying main app template...');
        var cssExtension = this.usingSass ? 'scss' : 'less';

        this.directory(sourceRoot + '/src/client/app', destinationRoot + '/src/client/app');
        this.directory(sourceRoot + '/src/client/images', destinationRoot + '/src/client/images');
        this.directory(sourceRoot + '/src/client/fonts', destinationRoot + '/src/client/fonts');
        this.directory(sourceRoot + '/src/client/styles/' + cssExtension, destinationRoot + '/src/client/styles');
        this.directory(sourceRoot + '/src/client/test-helpers', destinationRoot + '/src/client/test-helpers');

        this.fs.copy(sourceRoot + '/src/client/_index.html', destinationRoot + '/src/client/index.html');

        this.directory(sourceRoot + '/src/server/utils', destinationRoot + '/src/server/utils');
        this.fs.copy(sourceRoot + '/src/server/_app.js', destinationRoot + '/src/server/app.js');
        this.fs.copy(sourceRoot + '/src/server/_routes.js', destinationRoot + '/src/server/routes.js');
        this.fs.copy(sourceRoot + '/src/server/_data.js', destinationRoot + '/src/server/data.js');
        this.fs.copy(sourceRoot + '/src/server/favicon.ico', destinationRoot + '/src/server/favicon.ico');
    },
    _createProjectFileSystem: function() {
        var destinationRoot = this.destinationRoot();
        var sourceRoot = this.sourceRoot();
        var appDirectory = destinationRoot + '/app';

        this._scaffoldFolders();
        this._packageFiles(sourceRoot, destinationRoot);
        this._appFiles(sourceRoot, destinationRoot);
    },
    _getQuestions: function() {
        var questions = [
            {
                name: 'name',
                message: 'What is the name of your project ?',
                default: this.appname,
                store: true
            },
            {
                name: 'description',
                message: 'What is a description of the project ?',
                store: true
            },
            {
                name: 'version',
                message: 'What is the version of your project ?',
                default: '0.0.1',
                store: true
            },
            {
                type: 'confirm',
                name: 'usingSass',
                message: 'Would you like to use SASS rather than LESS ?',
                default: true
            }
        ];

        return questions;
    },
    _saveAnswers: function(answers, callback) {
        this.appName = answers.name;
        this.appDescription = answers.description;
        this.appVersion = answers.version;
        this.usingSass = answers.usingSass;
        callback();
    },
    constructor: function() {
        generators.Base.apply(this, arguments);
    },
    initializing: function() {
        var message = chalk.cyan.bold('Welcome to GDP Angular ') +
            chalk.yellow('Bootstrap Dashboard Starter Template');
        this.log(yosay(message, {maxLength: 22}));
    },
    prompting: function() {
        var done = this.async();

        this.prompt(this._getQuestions(), function(answers) {
            this._saveAnswers(answers, done);
        }.bind(this));
    },
    configuring: function() {
        this.config.save();
    },
    writing: function() {
        this._createProjectFileSystem();
    },
    install: function() {
        this.bowerInstall();
        this.npmInstall();

        this.log(chalk.green.bold('Project has been generated !'));
    }
});
