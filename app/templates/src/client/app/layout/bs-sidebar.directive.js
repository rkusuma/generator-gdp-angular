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
        function SidebarController($state, routerHelper) {
            var vm = this;
            var states = routerHelper.getStates();

            vm.isCurrent = isCurrent;
            vm.getNavRoutes = getNavRoutes;
            vm.getChildNavRoutes = getChildNavRoutes;

            activate();

            ////////////////

            function activate() {

            }

            function getNavRoutes() {
                return states.filter(function(r) {
                    return r.settings && r.settings.nav && !r.settings.parent;
                }).sort(function(r1, r2) {
                    return r1.settings.nav - r2.settings.nav;
                });
            }

            function getChildNavRoutes(parentState) {
                return states.filter(function(r) {
                    return r.settings && r.settings.parent &&
                        r.settings.parent === parentState.settings.nav;
                }).sort(function(r1, r2) {
                    return r1.settings.nav - r2.settings.nav;
                });
            }

            function isCurrent(route) {
                if (!route.title || !$state.current || !$state.current.title) {
                    return '';
                }
                var baseState = $state.current.name.split('.')[0];
                return baseState === route.name ? 'active' : '';
            }
        }
    }

})();
