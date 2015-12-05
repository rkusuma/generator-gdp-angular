(function() {
    'use strict';

    angular.module('app.layout')
        .directive('bsNavbar', bsNavbar);

    function bsNavbar() {
        return {
            restrict: 'E',
            replace: true,
            controller: NavbarController,
            controllerAs: 'vm',
            templateUrl: 'app/layout/bs-navbar.html'
        };

        /* @ngInject */
        function NavbarController() {

        }
    }

})();
