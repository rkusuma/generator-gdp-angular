/**
 * Created by romy.kusuma on 5/18/2015.
 */

(function() {
    'use strict';

    angular.module('app.core', [
        'app.configuration',
        'ngAnimate',
        'ngSanitize',
        'ngResource',
        'blocks.crypto',
        'blocks.exception',
        'blocks.logger',
        'blocks.router',
        'ui.router',
        'ui.bootstrap',
        'http-auth-interceptor'
    ]);

})();
