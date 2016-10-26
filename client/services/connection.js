'use strict';

angular.module(window.APP.modules.main)

.service('connection', ['$rootScope', '$filter', 'alertify',
    function($rootScope, $filter, alertify) {
        var self;
        var connection = function() {
            self = this;
            self.init();
        };

        connection.prototype = {
            init: function() {
                self.isOnline = false;

                // add event listener
                window.addEventListener('online',  function() {
                    self.isOnline = true;
                    $('body').removeClass('connection-closed');
                    if (self.logInstance) {
                        self.logInstance.clearLogs();
                    }
                });
                window.addEventListener('offline', function() {
                    self.isOnline = false;
                    $('body').addClass('connection-closed');
                    self.logInstance = alertify.delay(0).closeLogOnClick(true).error('<h4>' + $filter('translate')('CONNECTION_ERROR_MESSAGE_TITLE') + '</h4><p>' + $filter('translate')('CONNECTION_ERROR_MESSAGE') + '</p>').reset().logPosition('bottom right').maxLogItems(3);
                });
            }
        };
        
        return connection;
    }
]);