# Skeleton Project using AngularJS & Bootstrap

> Yeoman generator for AngularJS project for Front End developers

This skeleton project based on [JohnPapa](https://github.com/johnpapa/angular-styleguide) styles.
Using dashboard template from [Bootstrap](http://getbootstrap.com/examples/dashboard/)

## Usage

Follow this steps to use Yeoman and this generator

Clone this repository to your local machine:
```
git clone https://github.com/rkusuma/generator-gdp-angular.git
```

Set your current directory to generator-gdp-angular:
```
cd [path to generator-gdp-angular directory]
```

Run this command:
```
npm link
```

Install `yo`, `gulp`, `bower`:
```
npm install -g yo gulp bower
```

Make a new directory for your project:
```
mkdir my-new-project
cd my-new-project
```

Run this command:
```
yo gdp-angular
```

To run your project in development mode:
```
gulp serve-dev
```

To run your project in production mode:
```
gulp serve-build
```

To run your project test:
```
gulp test
```
