'use strict';

angular.module(window.APP.modules.main)

.directive('pagesize', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/components/common/pagesize/view.html'
    };
});