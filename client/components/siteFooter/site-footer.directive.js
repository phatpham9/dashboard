'use strict';

angular
	.module(window.APP.modules.main)
	.directive('siteFooter', siteFooter);

siteFooter.$inject = [];
function siteFooter() {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/components/siteFooter/site-footer.html'
    };
}