'use strict';

angular
    .module(window.APP.modules.main)
    .service('setting', setting);

setting.$inject = ['APP'];
function setting(APP) {
    var storageKey = APP.name + '_SETTING';
    var service = {
        init: init,
        set: set,
        reset: reset
    };

    return service;

    // functions
    function init() {
        if (localStorage[storageKey]) {
            var settings = JSON.parse(localStorage[storageKey]);
            Object.keys(settings).forEach(function(key) {
                service[key] = settings[key];
            });
        } else {
            service.reset();
        }
    };
    function set(settings) {
        Object.keys(settings).forEach(function(key) {
            service[key] = settings[key];
        });
        localStorage[storageKey] = JSON.stringify(service);
    }
    function reset() {
        // delete all current settings
        Object.keys(service).forEach(function(key) {
            delete service[key];
        });
        // set default settings
        if (APP.defaultSettings) {
            service.set(APP.defaultSettings);
        }
        localStorage[storageKey] = JSON.stringify(service);
    }
}