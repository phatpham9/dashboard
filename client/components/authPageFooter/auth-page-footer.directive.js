'use strict';

angular
	.module(window.APP.modules.main)
	.directive('authPageFooter', function() {
	    return {
	        restrict: 'E',
	        scope: true,
	        templateUrl: '/components/authPageFooter/auth-page-footer.html'
	    };
	});