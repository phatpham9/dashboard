'use strict';

angular
	.module(window.APP.modules.main)
	.directive('copyright', ['APP',
		function(APP) {
		    return {
		        restrict: 'EA',
		        scope: true,
		        template: APP.author.name + ' © ' + APP.year
		    };
		}
	]);