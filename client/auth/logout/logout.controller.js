'use strict';

angular
	.module(window.APP.modules.auth)
	.controller('logout', ['$scope', '$state', 'authAPI',
	    function($scope, $state, authAPI) {
	    	logout();

	    	// functions
	    	function logout() {
		        authAPI.logout(function() {
		            $scope.USER.logout();
		            $state.go('login');
		        });
		    }
	    }
	]);