/* global _:false, moment:false, toastr:false */
(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('_', _)
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('constant', {
            SESSION: {
                TOKENS: '_session',
                USER: '_user'
            }
        });
})();
