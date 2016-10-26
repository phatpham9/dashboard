'use strict';

angular.module(window.APP.modules.main)

// side bar
.directive('siteNavbar', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/components/common/siteNavbar/view.html'
    };
});