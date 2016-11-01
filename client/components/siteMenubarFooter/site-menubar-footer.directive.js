'use strict';

angular
	.module(window.APP.modules.main)
	.directive('siteMenubarFooter', siteMenubarFooter);

siteMenubarFooter.$inject = [];
function siteMenubarFooter() {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/components/siteMenubarFooter/site-menubar-footer.html'
    };
}