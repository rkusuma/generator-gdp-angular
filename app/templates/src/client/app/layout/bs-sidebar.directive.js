(function() {
    'use strict';

    angular.module('app.layout')
        .directive('bsSidebar', bsSidebar);

    function bsSidebar() {
        return {
            restrict: 'E',
            replace: true,
            controller: SidebarController,
            controllerAs: 'vm',
            templateUrl: 'app/layout/bs-sidebar.html'
        };

        /* @ngInject */
        function SidebarController() {

        }
    }

})();
