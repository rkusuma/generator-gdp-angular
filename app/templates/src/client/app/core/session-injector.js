/**
 * Created by romy.kusuma on 5/22/2015.
 */
(function() {
    'use strict';

    angular.module('app.core')
        .factory('sessionInjector', sessionInjector);

    /* @ngInject */
    function sessionInjector(session) {
        var service = {
            request: request
        };

        return service;

        ////////////////

        function request(config) {
            if (!config.basicAuth && !session.isEmpty()) {
                var tokens = session.getTokens();
                if (tokens) {
                    /* jshint -W106 */
                    config.headers['Authorization'] = 'Bearer ' + tokens.access_token;
                }
            }
            return config;
        }
    }

})();
