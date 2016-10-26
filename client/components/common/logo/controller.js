'use strict';

angular.module(window.APP.modules.main)

.directive('logo', function() {
    return {
        templateUrl: '/components/common/logo/view.html',
        restrict: 'E',
        replace: true,
        scope: {
        	color: '@color'
        },
        controller: ['$scope',
        	function($scope) {
        		if ($scope.color) {
        			$scope.url = '/assets/images/logo-48-' + $scope.color + '.png';
        		} else {
        			$scope.url = '/assets/images/logo-48.png';
        		}
        	}
        ]
    };
});