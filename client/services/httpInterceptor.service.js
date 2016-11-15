'use strict';

angular
    .module(window.APP.modules.main)
    .factory('httpResponseError', httpResponseError);

httpResponseError.$inject = ['$q', '$injector'];
function httpResponseError($q, $injector) {
    return {
        responseError: function(res) {
            var logger = $injector.get('logger');
            var translate = $injector.get('translate');
            
            switch(res.status) {
                case 400:
                    if (res.data.validationErrors) {
                        Object.keys(res.data.validationErrors).forEach(function(key) {
                            res.data.validationErrors[key] = translate(res.data.validationErrors[key]);
                        });
                    } else if (res.data.message) {
                        logger.error(translate(res.data.message));
                    }
                    break;
                case 401:
                    if (['/api/login', '/api/signup', '/api/forgotPassword', '/api/resetPassword'].indexOf(res.config.url) === -1) {
                        $injector.get('user').logout();
                    }
                case 403:
                case 404:
                case 500:
                    if (res.data.message) {
                        logger.error(translate(res.data.message));
                    }
                    break;
            }
            return $q.reject(res);
        }
    };
}