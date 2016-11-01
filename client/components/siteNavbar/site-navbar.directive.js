'use strict';

angular
	.module(window.APP.modules.main)
	.directive('siteNavbar', function() {
	    return {
	        restrict: 'E',
	        replace: true,
	        scope: true,
	        templateUrl: '/components/siteNavbar/site-navbar.html'
	    };
	});