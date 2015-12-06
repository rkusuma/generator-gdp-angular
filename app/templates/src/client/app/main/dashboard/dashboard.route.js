(function() {
    'use strict';

    angular.module('app.dashboard')
        .run(appRun);

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/',
                    templateUrl: 'app/main/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                    title: 'Dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    },
                    access: {
                        loginRequired: true
                    }
                }
            },
            {
                state: 'overview',
                config: {
                    url: '/overview',
                    templateUrl: 'app/main/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                    title: 'Dashboard',
                    settings: {
                        nav: 1,
                        parent: 1,
                        content: '<i class="fa fa-dashboard"></i> Overview'
                    },
                    access: {
                        loginRequired: true
                    }
                }
            }
        ];
    }

})();
