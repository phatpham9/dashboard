'use strict';

angular
    .module(window.APP.modules.main)
    .directive('authPageHeader', authPageHeader);

authPageHeader.$inject = [];
function authPageHeader() {
    return {
        restrict: 'E',
        scope: {
            heading: '=headingText',
            sub: '=subText'
        },
        templateUrl: '/components/authPageHeader/auth-page-header.html'
    };
}