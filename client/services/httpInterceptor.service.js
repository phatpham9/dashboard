'use strict';

angular
    .module(window.APP.modules.main)
    .factory('httpResponseError', ['$rootScope', '$q', '$injector', 'translate', 'logger',
        function($rootScope, $q, $injector, translate, logger) {
            return {
                responseError: function(res) {
                    var $state = $injector.get('$state');
                    switch(res.status) {
                        case 400:
                            if (res.data.validationErrors) {
                                var keys = Object.keys(res.data.validationErrors);
                                keys.forEach(function(key) {
                                    res.data.validationErrors[key] = translate(res.data.validationErrors[key]);
                                });
                            } else if (res.data.message) {
                                logger.error(translate(res.data.message));
                            }
                            break;
                        case 401:
                            if (['/api/login', '/api/forgotPassword', '/api/resetPassword'].indexOf(res.config.url) === -1) {
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
    ]);
