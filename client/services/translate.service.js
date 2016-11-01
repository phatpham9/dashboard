'use strict';

angular
    .module(window.APP.modules.main)
    .service('translate', translate);

translate.$inject = ['$rootScope'];
function translate($rootScope) {
    return service;

    // functions
    function service(key, texts) {
        if (key) {
            key = key.replace(/( |-)/g, '_').toUpperCase();

            if (texts) {
                var result = $rootScope.LANGUAGE.source[key];
                if (Array.isArray(texts)) {
                    texts.forEach(function(text) {
                        result = result.replace(/%s/, text);
                    });
                } else {
                    result = result.replace(/%s/g, texts);
                }
                return result;
            } else {
                return $rootScope.LANGUAGE && $rootScope.LANGUAGE.source ? ($rootScope.LANGUAGE.source[key] || key) : key;
            }
        } else {
            return '';
        }
    }
}