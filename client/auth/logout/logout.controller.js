'use strict';

angular
	.module(window.APP.modules.auth)
	.controller('logout', logoutController);

logoutController.$inject = ['$scope', '$state', 'authAPI'];
function logoutController($scope, $state, authAPI) {
	logout();

	// functions
	function logout() {
        authAPI.logout(function() {
            $scope.USER.logout();
            $state.go('login');
        });
    }
}