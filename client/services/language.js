'use strict';

angular.module(window.APP.modules.main)

.service('language', ['APP', '$rootScope', '$http',
	function(APP, $rootScope, $http) {
		var storageKey = APP.name + '_LANG';
		var self;
		var language = function() {
			self = this;
			self.init();
		};

		language.prototype = {
			init: function() {
				var lang = sessionStorage[storageKey] ? JSON.parse(sessionStorage[storageKey]) : null;
				if (lang) {
					self.switch(lang.locale);
				} else {
					self.switch(APP.language);
				}
			},
			switch: function(locale, reload) {
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
		};

		return language;
	}
]);