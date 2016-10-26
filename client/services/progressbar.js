'use strict';

angular.module(window.APP.modules.main)

.service('progressbar', ['$rootScope', 'ngProgressFactory',
    function($rootScope, ngProgressFactory) {
        var self;
        var progressbar = function() {
            self = this;
            self.init();
        };
        progressbar.prototype = {
            init: function() {
                self.instance = ngProgressFactory.createInstance();
                
                $rootScope.$on('$stateChangeStart', function() {
                    self.start();
                });
                $rootScope.$on('$viewContentLoaded', function() {
                    self.complete();
                });
            },
            start: function() {
                self.instance.start();
            },
            complete: function() {
                self.instance.complete();
            }
        };

        return progressbar;
    }
]);