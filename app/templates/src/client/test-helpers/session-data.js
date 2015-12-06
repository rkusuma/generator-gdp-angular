/**
 * Created by romy.kusuma on 12/6/2015.
 */
var SessionData = (function() {
    return {
        getToken: getToken,
        getUser: getUser
    };

    function getToken() {
        return {
            'access_token': 'access_token',
            'refresh_token': 'refresh_token',
            'expired': 123123123
        };
    }

    function getUser() {
        return {
            username: 'username',
            roles: 'roles',
            fullname: 'fullname'
        };
    }
})();
