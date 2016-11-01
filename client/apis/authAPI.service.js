'use strict';

angular
    .module(window.APP.modules.main)
    .service('authAPI', ['$resource',
        function($resource) {
            return $resource('/api/:action/:data', null, {
                login: {
                    method: 'POST',
                    params: {
                        action: 'login'
                    }
                },
                signup: {
                    method: 'POST',
                    params: {
                        action: 'signup'
                    }
                },
                forgotPassword: {
                    method: 'POST',
                    params: {
                        action: 'forgotPassword'
                    }
                },
                resetPassword: {
                    method: 'POST',
                    params: {
                        action: 'resetPassword',
                        data: '@token'
                    }
                },
                logout: {
                    method: 'GET',
                    params: {
                        action: 'logout'
                    }
                }
            });
        }
    ]);
