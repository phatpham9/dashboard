'use strict';

angular
	.module(window.APP.modules.main)
	.directive('pagesize', function() {
	    return {
	        restrict: 'E',
	        replace: true,
	        scope: true,
	        templateUrl: '/components/pagesize/pagesize.html'
	    };
	});