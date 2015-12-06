(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController(logger) {
        var vm = this;
        vm.login = login;

        activate();

        ////////////////

        function activate() {
            logger.info('Login Page');
        }

        function login() {

        }
    }
})();
