/**
 * Created by romy.kusuma on 12/4/2015.
 */
'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = generators.Base.extend({
    _scaffoldFolders: function(appDirectory) {
        this.log('Creating project file system...');
        mkdirp(appDirectory + '/src');
        mkdirp(appDirectory + '/src/client');
        mkdirp(appDirectory + '/src/client/app');
        mkdirp(appDirectory + '/src/client/fonts');
        mkdirp(appDirectory + '/src/server');
    },
    _packageFiles: function(sourceRoot, destinationRoot) {
        var templateContext = {
            appName: this.appName,
            appDescription: this.appDescription,
            appVersion: this.appVersion
        };
        this.log('Copying package files...');

        this.fs.copy(sourceRoot + '/bowerrc', destinationRoot + '/.bowerrc');
        this.fs.copyTpl(sourceRoot + '/_bower.json', destinationRoot + '/bower.json', templateContext);
        this.fs.copy(sourceRoot + '/jshintrc', destinationRoot + '/.jshintrc');
        this.fs.copy(sourceRoot + '/jscsrc', destinationRoot + '/.jscsrc');
        this.fs.copy(sourceRoot + '/gitignore', destinationRoot + '/.gitignore');
        this.fs.copyTpl(sourceRoot + '/_README.md', destinationRoot + '/README.md', templateContext);
        this.fs.copy(sourceRoot + '/_gulpfile.js', destinationRoot + '/gulpfile.js');
        this.fs.copy(sourceRoot + '/_gulp.config.js', destinationRoot + '/gulp.config.js');
        this.fs.copy(sourceRoot + '/_karma.conf.js', destinationRoot + '/karma.conf.js');
        this.fs.copyTpl(sourceRoot + '/_package.json', destinationRoot + '/package.json', templateContext);
        this.fs.copy(sourceRoot + '/_config.json', destinationRoot + '/config.json');
    },
    _appFiles: function(sourceRoot, appDirectory) {
        this.log('Copying main app template...');

        this.directory('src/client/app', 'app/src/client/app');
        this.directory('src/client/images', 'app/src/client/images');
        this.directory('src/client/fonts', 'app/src/client/fonts');
        this.directory('src/client/styles', 'app/src/client/styles');
        this.directory('src/client/test-helpers', 'app/src/client/test-helpers');

        this.fs.copy(sourceRoot + '/src/client/_index.html', appDirectory + '/src/client/index.html');
        this.fs.copy(sourceRoot + '/src/server/_app.js', appDirectory + '/src/server/app.js');
    },
    _createProjectFileSystem: function() {
        var destinationRoot = this.destinationRoot();
        var sourceRoot = this.sourceRoot();
        var appDirectory = destinationRoot + '/app';

        this._scaffoldFolders(appDirectory);
        this._packageFiles(sourceRoot, destinationRoot);
        this._appFiles(sourceRoot, appDirectory);
    },
    _getQuestions: function() {
        var questions = [
            {
                name: 'name',
                message: 'What is the name of your project ?',
                default: this.appName
            },
            {
                name: 'description',
                message: 'What is a description of the project ?'
            },
            {
                name: 'version',
                message: 'What is the version of your project ?',
                default: '0.0.1'
            }
        ];

        return questions;
    },
    _saveAnswers: function(answers, callback) {
        this.appName = answers.name;
        this.appDescription = answers.description;
        this.appVersion = answers.version;
        callback();
    },
    constructor: function() {
        generators.Base.apply(this, arguments);
    },
    initializing: function() {
        var message = chalk.cyan.bold('Welcome to GDP Angular ') +
            chalk.yellow('Skeleton Project for Front End Developers');
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

    }
});
