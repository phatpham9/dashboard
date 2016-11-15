'use strict';

angular
    .module(window.APP.modules.main)
    .service('user', user);

user.$inject = ['APP', '$rootScope', '$cookieStore', '$state'];
function user(APP, $rootScope, $cookieStore, $state) {
    var service = {
        init: init,
        isLoggedin: isLoggedin,
        login: login,
        logout: logout,
        isMe: isMe
    };

    return service;

    // functions
    function init() {
        if ($cookieStore.get(APP.cookieId)) {
            service.login($cookieStore.get(APP.cookieId), true);
        }
    }
    function isLoggedin() {
        return service._id ? true : false;
    }
    function login(_user, dontUpdateCookie) {
        service._id = _user._id;
        service.email = _user.email;
        service.group = _user.group;
        service.permissions = _user.group ? _user.group.permissions : {};
        if (!dontUpdateCookie) {
            $cookieStore.put(APP.cookieId, _user);
        }
        $rootScope.$emit('userLoggedin');
    }
    function logout() {
        service._id = undefined;
        service.email = undefined;
        service.group = undefined;
        service.permissions = {undefined};
        $cookieStore.remove(APP.cookieId);
        $rootScope.$emit('userLoggedout');
        $state.go('login');
    }
    function isMe(userId) {
        return service._id === userId;
    }
}