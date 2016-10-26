'use strict';

angular.module(window.APP.modules.main)

.service('auth', ['$rootScope', '$state',
    function($rootScope, $state) {
        var self;
        var auth = function() {
            self = this;
            self.init();
        };
        auth.prototype = {
            init: function() {
                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                    if (!self.isAllowed(toState.auth, true)) {
                        if ($rootScope.PROGRESSBAR) {
                            $rootScope.PROGRESSBAR.complete();
                        }
                        return event.preventDefault();
                    }
                });
            },
            isAllowed: function(auth, routing) {
                if (!auth) {
                    return true;
                }
                // check login
                if (auth.requiresLogin === true && !$rootScope.USER.isLoggedin()) {
                    if (routing) {
                        $state.go('login');
                    }
                    return false;
                }
                if (auth.requiresLogin === false && $rootScope.USER.isLoggedin()) {
                    if (routing) {
                        $state.go('home');
                    }
                    return false;
                }
                // check permissions
                if (auth.allows) {
                    // check resources
                    var resourceAllowed = false;
                    var resources = Object.keys(auth.allows);
                    for (var i = 0; i < resources.length; i++) {
                        var resource = resources[i];
                        // check if the user has this resource
                        if (!$rootScope.USER.permissions[resource]) {
                            resourceAllowed = resourceAllowed || false;
                        } else {
                            var permissionAllowd = false;
                            for (var j = 0; j < auth.allows[resource].length; j++) {
                                var permission = auth.allows[resource][j];
                                // check if the user has this permission
                                if ($rootScope.USER.permissions[resource].indexOf(permission) === -1) {
                                    permissionAllowd = false;
                                    break;
                                } else {
                                    permissionAllowd = true;
                                }
                            }
                            resourceAllowed = resourceAllowed || permissionAllowd;
                        }
                    }
                    if (!resourceAllowed) {
                        if (routing) {
                            $state.go('home');
                        }
                        return false;
                    }
                }
                return true;
            }
        };

        return auth;
    }
]);