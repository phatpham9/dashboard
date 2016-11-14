'use strict';

angular
	.module(window.APP.modules.main)
	.service('language', language);

language.$inject = ['APP', '$http'];
function language(APP, $http) {
	var storageKey = APP.name + '_LANG';
	var service = {
		locale: undefined,
		source: undefined,
		init: init,
		switch: switchFunc
	};
	
	return service;
	
	// functions
	function init() {
		var lang = sessionStorage[storageKey] ? JSON.parse(sessionStorage[storageKey]) : undefined;
		if (lang && lang.locale && lang.source) {
			service.locale = lang.locale;
			service.source = lang.source;
		} else {
			service.switch(APP.language);
		}
	}
	function switchFunc(locale, reload) {
		if (locale) {
			service.locale = locale;
            $http.get('/assets/languages/' + service.locale + '.json')
            .then(function(res) {
            	service.source = res.data;
            	sessionStorage[storageKey] = JSON.stringify(service);
            	if (reload) {
            		location.reload();
            	}
            });
        }
	}
}