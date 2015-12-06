/**
 * Created by romy.kusuma on 12/6/2015.
 */
/* jshint -W117 */
describe('Core Module', function() {
    var session;
    var $window;
    var crypto;
    var constant;
    var $rootScope;

    beforeEach(module('app.core'));

    describe('Session Service', function() {
        beforeEach(inject(function($injector) {
            session = $injector.get('session');
            $window = $injector.get('$window');
            crypto = $injector.get('crypto');
            constant = $injector.get('constant');
            $rootScope = $injector.get('$rootScope');
            session.clean();
        }));

        it('should created successfully', function() {
            expect(session).toBeDefined();
        });

        it('should create _session localStorage when saveTokens called', function() {
            var token = SessionData.getToken();

            session.saveTokens(token);
            expect($window.localStorage.getItem(constant.SESSION.TOKENS)).toBeDefined();
        });

        it('should return null if session empty', function() {
            var tokens = session.getTokens();
            expect(tokens).toBeNull();
        });

        it('should return token when getTokens called', function() {
            var expectedToken = SessionData.getToken();

            session.saveTokens(expectedToken);
            var tokens = session.getTokens();
            expect(tokens).toBeDefined();
            expect(tokens).toEqual(expectedToken);
        });

        it('should create user localStorage when saveUser called', function() {
            var user = SessionData.getUser();

            session.saveUser(user);
            expect($window.localStorage.getItem(constant.SESSION.USER)).toBeDefined();
        });

        it('should return user when getUser called', function() {
            var expectedUser = SessionData.getUser();

            session.saveUser(expectedUser);
            var user = session.getUser();
            expect(user).toEqual(expectedUser);
        });

        it('should clear all localStorage when clean called', function() {
            var token = SessionData.getToken();
            var user = SessionData.getUser();

            session.saveTokens(token);
            session.saveUser(user);

            session.clean();
            expect($window.localStorage.getItem(constant.SESSION.TOKENS)).toBeNull();
            expect($window.localStorage.getItem(constant.SESSION.USER)).toBeNull();
        });

        it('should return true when session localStorage empty', function() {
            var result = session.isEmpty();
            expect(result).toBeTruthy();
        });

        it('should return false when session localStorage not empty', function() {
            var token = SessionData.getToken();
            session.saveTokens(token);

            var result = session.isEmpty();
            expect(result).toBeFalsy();
        });

        it('should return null when token expired', function() {
            var tokens = SessionData.getToken();
            tokens.expires = 16431;

            var tokensString = JSON.stringify(tokens);
            var encrypted = crypto.encode(tokensString);
            $window.localStorage.setItem(constant.SESSION.TOKENS,
                JSON.stringify(encrypted.toString()));
            $rootScope.$apply();

            var result = session.getTokens();
            expect(result).toBeNull();
        });
    });

});
