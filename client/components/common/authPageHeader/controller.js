'use strict';

angular.module(window.APP.modules.main)

.directive('authPageHeader', function() {
    return {
        templateUrl: '/components/common/authPageHeader/view.html',
        restrict: 'E',
        scope: {
        	heading: '=headingText',
        	sub: '=subText'
        },
        controller: ['$rootScope', '$scope',
        	function($rootScope, $scope) {
        		$scope.APP = $rootScope.APP;
        	}
        ]
    };
});