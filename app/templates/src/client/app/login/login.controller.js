(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController(logger, session, $http, $state) {
        var vm = this;
        vm.login = login;

        activate();

        ////////////////

        function activate() {
            logger.info('Login Page');
        }

        function login() {
            $http.post('/api/login', {username: vm.username, password: vm.password})
                .then(function(result) {
                    session.saveTokens(result.data);
                    $state.go('dashboard');
                });
        }
    }
})();
