'use strict';

angular.module(window.APP.modules.main)

.directive('languageSwitcher', function() {
    return {
        templateUrl: '/components/common/languageSwitcher/view.html',
        restrict: 'E',
        replace: true,
        controller: ['$rootScope', '$scope',
        	function($rootScope, $scope) {
        		$scope.languages = [{
        			key: 'en',
        			name: 'English',
        			icon: 'flag-icon-us'
        		}, {
        			key: 'vi',
        			name: 'Việt Nam',
        			icon: 'flag-icon-vn'
        		}];
        	}
        ]
    };
});