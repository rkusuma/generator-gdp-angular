/**
 * Created by romy.kusuma on 7/1/2015.
 */
(function() {
    'use strict';

    angular.module('app.authorization')
        .run(appRun);

    /* @ngInject */
    function appRun($rootScope, $location, $state, authorizationService, constant) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (toState.access) {
                var authorised = authorizationService.authorize(
                    toState.access.loginRequired,
                    toState.access.permissions,
                    toState.access.permissionCheckType
                );

                if (authorised === constant.AUTHORIZATION.PERMISSION.LOGIN_REQUIRED) {
                    event.preventDefault();
                    $state.go('login');
                }
                else if (authorised === constant.AUTHORIZATION.PERMISSION.NOT_AUTHORISED) {
                    $location.path('/').replace();
                }
            }
        });
    }
})();
