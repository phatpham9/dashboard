'use strict';

angular.module(window.APP.modules.main)

.directive('authPageFooter', function() {
    return {
        templateUrl: '/components/common/authPageFooter/view.html',
        restrict: 'E',
        replace: true
    };
});