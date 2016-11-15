'use strict';

angular
    .module(window.APP.modules.main)
    .service('progressbar', progressbar);

progressbar.$inject = ['$rootScope', 'ngProgressFactory', 'auth'];
function progressbar($rootScope, ngProgressFactory, auth) {
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
            if (auth.isAllowed(toState.auth, true)) {
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