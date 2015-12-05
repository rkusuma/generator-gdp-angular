# <%= appName %>

### Client Technologies
- AngularJS 1.3.18
- jQuery 2.1.4
- Gulp 3.8.11
- Bootstrap 3.3.6
- Font Awesome 4.4.0
- HTML5
- CSS3
<% if (usingSass) { %>- SASS<% } else { %>- LESS<% } %>

### Server Technologies (for development)
- NodeJS 4.2.3
- NPM 2.1.14
- ExpressJS 4.12.4

### Testing (Unit Testing & End to End Testing)
- Karma (Test Runner)
- Jasmine 2.3.4 (Testing Library)
- Protractor (E2E Testing Library)
- PhantomJS (Browser for testing)

### Code Analyzer
- JSHint (JavaScript Code Quality Tool)
- JSCS (JavaScript Code Style Checker)

### Reporter
- Report code coverage (HTML, Cobertura)
- Report jasmine tests

### How to build
- Create Environment Variable `NODE_ENV`, and set value `development`

- Install NodeJS (You can install manually or use [chocolatey](https://chocolatey.org/) or [homebrew](http://brew.sh/))

```
For Developer using Windows need some dependencies before install nodejs:
1. Latest version of Visual Studio (latest version of Visual Studio 2015 or Visual Studio Community)
2. git
3. phyton (version 2.7.x)
```
Please checkout this [link](http://www.johnpapa.net/tips-for-running-node-and-npm-on-windows/) for more information.

- Install bower and gulp

```
npm install -g bower gulp
```

- Install bower dependencies

```
bower install
```

- Install package dependencies

```
npm install
```

- Run for development mode

```
gulp serve-dev
```

- Run for production mode

```
gulp serve-build
```

- To run test independently

```
gulp test
```

- To start analyzer JSHint and JSCS

```
gulp vet
```

- To update dependencies in index.html

```
gulp wiredep
```

- To bump the version

```
gulp bump --type=[type]
or
gulp bump --version=[version]
```

```
type = ['major', 'minor', 'patch' 'prerelease']
default type = 'patch'
```

```
version = use semantic version (ex: 1.0.0)
```


### Angular Style Guide
Using angular style guide from [Johnpapa](https://github.com/johnpapa/angular-styleguide)

