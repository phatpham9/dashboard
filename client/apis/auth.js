'use strict';

angular.module(window.APP.modules.main)

.service('authAPI', ['$resource',
    function($resource) {
        var api = $resource('/api/:action/:data', null, {
            login: {
                method: 'POST',
                params: {
                    action: 'login'
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
        
        return api;
    }
]);
