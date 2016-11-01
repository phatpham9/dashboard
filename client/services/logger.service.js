'use strict';

angular
    .module(window.APP.modules.main)
    .service('logger', ['alertify',
        function(alertify) {
            var service = {
                init: init,
                reset: reset,
                alert: alertFunc,
                success: success,
                error: error
            };

            return service;

            // functions
            function init() {
                service.reset();
            }
            function reset() {
                return alertify.reset().logPosition('bottom right').maxLogItems(3);
            }
            function alertFunc(text) {
                return alertify.alert(text);
            }
            function success(text) {
                return alertify.success(text);
            }
            function error(text) {
                return alertify.error(text);
            }
        }
    ]);
