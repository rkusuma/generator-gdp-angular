(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.preventDuplicates = true;
        toastr.options.closeButton = true;
    }

    var config = {
        appErrorPrefix: '[<%= appName %> Error]',
        appTitle: '<%= appName %>'
    };

    core.value('config', config);

    core.config(interceptor);
    interceptor.$inject = ['$httpProvider'];

    /* @ngInject */
    function interceptor($httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }

    core.config(configure);

    /* @ngInject */
    function configure($compileProvider, $logProvider,
                       routerHelperProvider, exceptionHandlerProvider) {
        $compileProvider.debugInfoEnabled(false);

        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        exceptionHandlerProvider.configure(config.appErrorPrefix);

        routerHelperProvider.configure({
            docTitle: '' // Add prefix for document title
        });
    }
})();
