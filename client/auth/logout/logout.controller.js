'use strict';

angular
	.module(window.APP.modules.auth)
	.controller('logout', logoutController);

logoutController.$inject = ['authAPI', 'user'];
function logoutController(authAPI, user) {
	logout();

	// functions
	function logout() {
        authAPI.logout(function() {
            user.logout();
        });
    }
}