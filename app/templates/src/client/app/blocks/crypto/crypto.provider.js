/**
 * Created by romy.kusuma on 12/6/2015.
 */
/* global CryptoJS:false */
(function() {
    'use strict';

    angular
        .module('blocks.crypto')
        .constant('CryptoJS', CryptoJS)
        .provider('crypto', cryptoProvider);

    /* @ngInject */
    function cryptoProvider() {
        /* jshint validthis:true */
        var config = {
            base64key: undefined
        };

        this.setBase64Key = function(key) {
            config.base64key = key;
        };

        this.$get = Crypto;

        /* @ngInject */
        function Crypto(CryptoJS) {
            var service = {
                encode: encode,
                decode: decode
            };

            return service;

            ///////////////

            function encode(value) {
                if (!config.base64key) {
                    throw new Error('Please set the key in configuration');
                }

                try {
                    var encrypted = CryptoJS.AES.encrypt(value, config.base64key);
                    return encrypted.toString();
                }
                catch (e) {
                    throw new Error('Failed to encrypt the value', e.message);
                }
            }

            function decode(encryptedValue) {
                if (!config.base64key) {
                    throw new Error('Please set the key in configuration');
                }

                try {
                    var decrypted = CryptoJS.AES.decrypt(encryptedValue, config.base64key);
                    return decrypted.toString(CryptoJS.enc.Utf8);
                }
                catch (e) {
                    throw new Error('Failed to encrypt the value', e.message);
                }
            }
        }
    }
})();
