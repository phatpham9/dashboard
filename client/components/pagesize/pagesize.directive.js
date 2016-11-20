'use strict';

angular
	.module(window.APP.modules.main)
	.directive('pagesize', pagesize);

pagesize.$inject = [];
function pagesize() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
        	model: '=psModel',
        	change: '=psOnChange'
        },
        templateUrl: '/components/pagesize/pagesize.html'
    };
}