'use strict';

angular
	.module(window.APP.modules.main)
	.directive('madeWithLove', ['APP',
		function(APP) {
		    return {
		        restrict: 'EA',
		        scope: true,
		        templateUrl: '/components/madeWithLove/made-with-love.html',
		        link: linkFunc
		    };

		    function linkFunc(scope) {
		    	scope.location = APP.author.location;
		    }
		}
	]);