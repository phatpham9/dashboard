'use strict';

angular
	.module(window.APP.modules.main)
	.directive('authPageFooter', authPageFooter);

authPageFooter.$inject = [];
function authPageFooter() {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/components/authPageFooter/auth-page-footer.html'
    };
}