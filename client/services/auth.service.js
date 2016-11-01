'use strict';

angular
    .module(window.APP.modules.main)
    .service('auth', auth);

auth.$inject = ['$rootScope', '$state'];
function auth($rootScope, $state) {
    var self;
    var service = function() {
        self = this;
        self.init();
    };

    service.prototype.init = init;
    service.prototype.isAllowed = isAllowed;

    return service;

    // functions
    function init() {
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            var authPages = ['login', 'signup', 'forgot-password', 'reset-password', 'page-successful'];
            if (authPages.indexOf(toState.name) !== -1) {
                $('body').addClass('page-auth layout-full page-dark');
            } else {
                $('body').removeClass('page-auth layout-full page-dark');
            }
        });
    }
    function isAllowed(auth, routing) {
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
}