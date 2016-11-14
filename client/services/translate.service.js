'use strict';

angular
    .module(window.APP.modules.main)
    .service('translate', translate);

translate.$inject = ['language'];
function translate(language) {
    return service;

    // functions
    function service(key, texts) {
        if (key) {
            key = key.replace(/( |-)/g, '_').toUpperCase();

            if (texts) {
                var result = language.source[key];
                if (Array.isArray(texts)) {
                    texts.forEach(function(text) {
                        result = result.replace(/%s/, text);
                    });
                } else {
                    result = result.replace(/%s/g, texts);
                }
                return result;
            } else {
                return language.source ? (language.source[key] || key) : key;
            }
        } else {
            return '';
        }
    }
}