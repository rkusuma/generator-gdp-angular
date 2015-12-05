(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $q, exception) {
        var service = {
            get: get,
            post: post,
            put: put,
            patch: patch,
            del: del
        };

        return service;

        ////////////////

        function get(endpoint, params, config) {
            params = params ? '?' + $.param(params) : '';
            config = config || {};
            return $http.get(endpoint + params, config)
                .then(function(result) {
                    return $q.when(result.data);
                })
                .catch(function(message) {
                    exception.catcher('Failed get data')(message);
                    return $q.reject(message.data);
                });
        }

        function post(endpoint, data) {
            return $http.post(endpoint, data)
                .then(function(result) {
                    return $q.when(result.data);
                })
                .catch(function(message) {
                    exception.catcher('Failed post data')(message);
                    return $q.reject(message.data);
                });
        }

        function put(endpoint, data) {
            return $http.put(endpoint, data)
                .then(function(result) {
                    return $q.when(result.data);
                })
                .catch(function(message) {
                    exception.catcher('Failed put data')(message);
                    return $q.reject(message.data);
                });
        }

        function patch(endpoint, data) {
            return $http.patch(endpoint, data)
                .then(function(result) {
                    return $q.when(result.data);
                })
                .catch(function(message) {
                    exception.catcher('Failed patch data')(message);
                    return $q.reject(message.data);
                });
        }

        function del(endpoint) {
            return $http.delete(endpoint)
                .then(function(result) {
                    return $q.when(result);
                })
                .catch(function(message) {
                    exception.catcher('Failed delete data')(message);
                    return $q.reject(message.data);
                });
        }
    }
})();
