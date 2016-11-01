'use strict';

angular
    .module(window.APP.modules.main)
    .service('connection', ['translate', 'logger',
        function(translate, logger) {
            var log;
            var service = {
                isOnline: false,
                init: init
            };

            return service;

            // functions
            function init() {
                // add event listener
                window.addEventListener('online',  function() {
                    service.isOnline = true;
                    $('body').removeClass('connection-closed');
                    if (log) {
                        log.clearLogs();
                    }
                });
                window.addEventListener('offline', function() {
                    service.isOnline = false;
                    $('body').addClass('connection-closed');
                    log = logger.reset().delay(0).closeLogOnClick(true).error('<h4>' + translate('CONNECTION_ERROR_MESSAGE_TITLE') + '</h4><p>' + translate('CONNECTION_ERROR_MESSAGE') + '</p>');
                    logger.reset();
                });
            }
        }
    ]);