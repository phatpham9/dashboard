'use strict';

angular
	.module(window.APP.modules.main)
	.directive('siteMenubarFooter', function() {
	    return {
	        restrict: 'E',
	        replace: true,
	        scope: true,
	        templateUrl: '/components/siteMenubarFooter/site-menubar-footer.html'
	    };
	});