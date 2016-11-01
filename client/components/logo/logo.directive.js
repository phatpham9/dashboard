'use strict';

angular
	.module(window.APP.modules.main)
	.directive('logo', logo);

logo.$inject = [];
function logo() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
        	color: '@color'
        },
        template: '<img ng-src="{{logoUrl}}">',
        link: linkFunc
    };

    function linkFunc(scope) {
    	if (scope.color) {
			scope.logoUrl = '/assets/images/logo-48-' + scope.color + '.png';
		} else {
			scope.logoUrl = '/assets/images/logo-48.png';
		}
    }
}