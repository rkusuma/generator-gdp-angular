(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController(logger) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            logger.info('Dashboard created');
        }
    }
})();
