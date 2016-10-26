'use strict';

angular.module(window.APP.modules.main)

.filter('money', ['$rootScope', '$locale', '$filter',
    function($rootScope, $locale, $filter) {
        return function(number) {
            return $filter('currency')(number, $locale.NUMBER_FORMATS.CURRENCY_SYM, 0);
        };
    }
]);