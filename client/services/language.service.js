'use strict';

angular
	.module(window.APP.modules.main)
	.service('language', language);

language.$inject = ['APP', '$rootScope', '$http'];
function language(APP, $rootScope, $http) {
	var storageKey = APP.name + '_LANG';
	var self;
	var service = function() {
		self = this;
		self.init();
	};

	service.prototype.init = init;
	service.prototype.switch = switchLanguage;
	
	return service;
	
	// functions
	function init() {
		var lang = sessionStorage[storageKey] ? JSON.parse(sessionStorage[storageKey]) : null;
		if (lang) {
			self.switch(lang.locale);
		} else {
			self.switch(APP.language);
		}
	}
	function switchLanguage(locale, reload) {
		if (locale) {
			self.locale = locale;
            $http.get('/assets/languages/' + self.locale + '.json')
            .then(function(res) {
            	self.source = res.data;
            	sessionStorage[storageKey] = JSON.stringify(self);
            	if (reload) {
            		location.reload();
            	}
            });
        }
	}
}