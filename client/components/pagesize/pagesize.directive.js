'use strict';

angular
	.module(window.APP.modules.main)
	.directive('pagesize', pagesize);

pagesize.$inject = [];
function pagesize() {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/components/pagesize/pagesize.html'
    };
}