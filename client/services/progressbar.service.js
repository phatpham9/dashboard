'use strict';

angular
    .module(window.APP.modules.main)
    .service('progressbar', ['$rootScope', 'ngProgressFactory',
        function($rootScope, ngProgressFactory) {
            var progressbar = ngProgressFactory.createInstance();
            var service = {
                init: init,
                start: start,
                complete: complete
            };
            
            return service;

            // functions
            function init() {
                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                    if ($rootScope.AUTH.isAllowed(toState.auth, true)) {
                        service.start();
                    } else {
                        return event.preventDefault();
                    }
                });
                $rootScope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams) {
                    service.complete();
                });
            }
            function start() {
                progressbar.start();
            }
            function complete() {
                progressbar.complete();
            }
        }
    ]);