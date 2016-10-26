'use strict';

angular.module(window.APP.modules.main)

.directive('siteFooter', function() {
    return {
        restrict: 'E',
        templateUrl: '/components/common/siteFooter/view.html',
        replace: true
    };
});