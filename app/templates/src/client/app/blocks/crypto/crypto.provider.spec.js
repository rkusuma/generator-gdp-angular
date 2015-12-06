/**
 * Created by romy.kusuma on 12/6/2015.
 */
/* jshint -W117 */
describe('blocks.crypto', function() {
    var cryptoProvider;
    var CryptoJS;

    beforeEach(module('blocks.crypto', function($provide, _cryptoProvider_) {
        cryptoProvider = _cryptoProvider_;
        $provide.value('CryptoJS', CryptoJS);
    }));

    describe('CryptoProvider without key', function() {
        beforeEach(inject(function(_CryptoJS_) {
            CryptoJS = _CryptoJS_;
        }));

        it('should throw error when key not configured', function() {
            var crypto = cryptoProvider.$get(CryptoJS);
            expect(crypto.encode).toThrow();
            expect(crypto.decode).toThrow();
        });
    });

    describe('CryptoProvider', function() {
        beforeEach(inject(function(_CryptoJS_) {
            CryptoJS = _CryptoJS_;
            cryptoProvider.setBase64Key('testKey');
        }));

        it('should be defined', function() {
            expect(cryptoProvider).toBeDefined();
        });

        it('should encode correctly', function() {
            var expected = 'encodedText';
            spyOn(CryptoJS.AES, 'encrypt').and.returnValue(expected);
            var encoded = cryptoProvider.$get(CryptoJS).encode('textdobeencoded');
            expect(encoded).toBeDefined();
            expect(encoded).toEqual('encodedText');
        });

        it('should throw error when encrypt failed', function() {
            spyOn(CryptoJS.AES, 'encrypt').and.throwError('Error');
            var crypto = cryptoProvider.$get(CryptoJS);
            expect(crypto.encode).toThrow();
        });

        it('should decode correctly', function() {
            var expected = 'decodedText';
            spyOn(CryptoJS.AES, 'decrypt').and.returnValue(expected);
            var decoded = cryptoProvider.$get(CryptoJS).decode('encodedText');
            expect(decoded).toBeDefined();
            expect(decoded).toEqual(expected);
        });

        it('should throw error when decrypt failed', function() {
            spyOn(CryptoJS.AES, 'decrypt').and.throwError('Error');
            var crypto = cryptoProvider.$get(CryptoJS);
            expect(crypto.decode).toThrow();
        });
    });
});
