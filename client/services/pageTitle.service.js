'use strict';

angular
    .module(window.APP.modules.main)
    .service('pageTitle', ['APP', '$rootScope', '$document', 'translate',
        function(APP, $rootScope, $document, translate) {
            var service = {
                titles: {
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
                    userDetails: 'USERS',
                    profile: 'PROFILE'
                },
                init: init,
                change: change
            };
            
            return service;

            // functions
            function init() {
                $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                    service.change(translate(service.titles[toState.name]));
                });
            }
            function change(title) {
                $document.prop('title', title + ' | ' + APP.title);
            }
        }
    ]);