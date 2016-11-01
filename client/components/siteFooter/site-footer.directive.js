'use strict';

angular
	.module(window.APP.modules.main)
	.directive('siteFooter', function() {
	    return {
	        restrict: 'E',
	        replace: true,
	        scope: true,
	        templateUrl: '/components/siteFooter/site-footer.html'
	    };
	});