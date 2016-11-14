'use strict';

angular
    .module(window.APP.modules.main)
    .factory('httpResponseError', httpResponseError);

httpResponseError.$inject = ['$rootScope', '$q', '$injector'];
function httpResponseError($rootScope, $q, $injector) {
    return {
        responseError: function(res) {
            var $state = $injector.get('$state');
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
                        $rootScope.USER.logout();
                        $state.go('login');
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