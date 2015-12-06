/**
 * Created by romy.kusuma on 12/6/2015.
 */
(function() {
    'use strict';

    angular.module('app.core')
        .run(appRun);

    function appRun(routerHelper) {
        var otherwise = '404';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'app/core/404.html',
                    title: '404'
                }
            },
            {
                state: '401',
                config: {
                    url: '/401',
                    templateUrl: 'app/core/401.html',
                    title: '401'
                }
            }
        ];
    }

})();
