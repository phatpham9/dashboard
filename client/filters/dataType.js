'use strict';

angular.module(window.APP.modules.main)

.filter('dataType', ['$rootScope',
    function($rootScope) {
        return function(str) {
            switch(typeof str) {
                case 'object':
                    return 'JSON';
                case 'number':
                    return 'number';
                default:
                    return 'text';
            }
        };
    }
]);