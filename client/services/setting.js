'use strict';

angular.module(window.APP.modules.main)

.service('setting', ['APP', '$rootScope',
    function(APP, $rootScope) {
        var storageKey = APP.name + '_SETTING';
        var self;
        var setting = function() {
            self = this;
            self.init();
        };

        setting.prototype = {
            init: function() {
                if (localStorage[storageKey]) {
                    var settings = JSON.parse(localStorage[storageKey]);
                    Object.keys(settings).forEach(function(key) {
                        self[key] = settings[key];
                    });
                } else {
                    self.reset();
                }
            },
            set: function(settings) {
                Object.keys(settings).forEach(function(key) {
                    self[key] = settings[key];
                });
                localStorage[storageKey] = JSON.stringify(self);
            },
            reset: function() {
                // delete all current settings
                Object.keys(self).forEach(function(key) {
                    delete self[key];
                });
                // set default settings
                if (APP.defaultSettings) {
                    self.set(APP.defaultSettings);
                } else {
                    localStorage[storageKey] = JSON.stringify(self);
                }
            }
        };

        return setting;
    }
]);