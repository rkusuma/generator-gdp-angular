(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('session', sessionService);

    /* @ngInject */
    function sessionService(moment, crypto, constant) {
        var service = {
            saveTokens: saveTokens,
            getTokens: getTokens,
            saveUser: saveUser,
            getUser: getUser,
            clean: clean,
            isEmpty: isEmpty
        };

        return service;

        ////////////////

        function saveTokens(tokens) {
            var now = moment().unix();
            tokens.expires = (12 * 60 * 60) + now;

            var tokensString = JSON.stringify(tokens);
            var encrypted = JSON.stringify(crypto.encode(tokensString));
            localStorage.setItem(constant.SESSION.TOKENS, encrypted);
        }

        function getTokens() {
            var tokens = null;

            if (!isEmpty()) {
                var now = moment().unix();
                var session = localStorage.getItem(constant.SESSION.TOKENS);
                var decrypted = crypto.decode(JSON.parse(session));
                tokens = JSON.parse(decrypted);

                if (tokens.expires && now >= tokens.expires) {
                    clean();
                    tokens = null;
                }
            }

            return tokens;
        }

        function saveUser(user) {
            var jsonUser = JSON.stringify(user);
            localStorage.setItem(constant.SESSION.USER, jsonUser);
        }

        function getUser() {
            return JSON.parse(localStorage.getItem(constant.SESSION.USER));
        }

        function clean() {
            localStorage.clear();
        }

        function isEmpty() {
            var tokens = localStorage.getItem(constant.SESSION.TOKENS);
            return !tokens;
        }
    }
})();
