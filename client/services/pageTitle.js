'use strict';

angular.module(window.APP.modules.main)

.service('pageTitle', ['APP', '$rootScope', '$filter',
    function(APP, $rootScope, $filter) {
        var self;
        var pageTitle = function() {
            self = this;
            self.init();
        };
        pageTitle.prototype = {
            init: function() {
                self.titles = {
                    login: 'LOGIN',
                    signup: 'SIGN_UP',
                    logout: 'LOGOUT',
                    'forgot-password': 'FORGOT_PASSWORD',
                    'reset-password': 'RESET_PASSWORD',
                    'page-successful': 'SUCCESSFUL',

                    home: 'HOME',
                    
                    settings: 'SETTINGS',
                    settingCreate: 'SETTINGS',
                    settingDetails: 'SETTINGS',

                    groups: 'GROUPS',
                    groupCreate: 'GROUPS',
                    groupDetails: 'GROUPS',

                    users: 'USERS',
                    userCreate: 'USERS',
                    userDetails: 'USERS'
                };

                $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                    self.change($filter('translate')(self.titles[toState.name]));
                });
            },
            change: function(title) {
                document.title = title + ' | ' + APP.title;
            }
        };

        return pageTitle;
    }
]);