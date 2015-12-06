/**
 * Created by romy.kusuma on 7/1/2015.
 */
(function() {
    'use strict';

    angular
        .module('app.authorization')
        .factory('authorizationService', AuthorizationService);

    /* @ngInject */
    function AuthorizationService(session, constant) {
        var service = {
            authorize: authorize
        };

        return service;

        ////////////////

        function authorize(loginRequired, requiredPermissions, permissionCheckType) {
            var result = constant.AUTHORIZATION.PERMISSION.AUTHORISED;
            var hasSession = session.getTokens();

            return processUser(hasSession, result);

            function processUser(hasSession, result) {
                permissionCheckType = permissionCheckType ||
                    constant.AUTHORIZATION.PERMISSION_TYPE.AT_LEAST_ONE;

                if (loginRequired && !hasSession) {
                    result = constant.AUTHORIZATION.PERMISSION.LOGIN_REQUIRED;
                }
                else if ((loginRequired && hasSession) &&
                    (!requiredPermissions || requiredPermissions.length === 0)) {
                    result = constant.AUTHORIZATION.PERMISSION.AUTHORISED;
                }
                else if (requiredPermissions) {
                    var user = session.getUser();
                    result = checkPermission(user, requiredPermissions, permissionCheckType);
                }

                return result;
            }
        }

        function checkPermission(user, requiredPermissions, permissionCheckType) {
            var hasPermission = true;
            var permissions = [];
            angular.forEach(user.permissions, function(permission) {
                permissions.push(permission.toLowerCase());
            });

            for (var i = 0; i < requiredPermissions.length; i++) {
                var permission = requiredPermissions[i].toLowerCase();

                if (permissionCheckType ===
                        constant.AUTHORIZATION.PERMISSION_TYPE.COMBINATION_REQUIRED) {
                    hasPermission = hasPermission && permissions.indexOf(permission) > -1;
                    if (!hasPermission) { break; }
                }
                else if (permissionCheckType ===
                        constant.AUTHORIZATION.PERMISSION_TYPE.AT_LEAST_ONE) {
                    hasPermission = permissions.indexOf(permission) > -1;
                    if (hasPermission) { break; }
                }
            }

            return hasPermission ?
                constant.AUTHORIZATION.PERMISSION.AUTHORISED :
                constant.AUTHORIZATION.PERMISSION.NOT_AUTHORISED;
        }

    }

})();
