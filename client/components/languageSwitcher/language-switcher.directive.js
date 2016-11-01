'use strict';

angular
    .module(window.APP.modules.main)
    .directive('languageSwitcher', function() {
        return {
            restrict: 'E',
            templateUrl: '/components/languageSwitcher/language-switcher.html',
            link: linkFunc
        };

        function linkFunc(scope) {
        	scope.languages = [{
    			key: 'en',
    			name: 'English',
    			icon: 'flag-icon-us'
    		}, {
    			key: 'vi',
    			name: 'Việt Nam',
    			icon: 'flag-icon-vn'
    		}];
        }
    });