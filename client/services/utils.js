'use strict';

angular.module(window.APP.modules.main)

.service('utils', ['$rootScope',
	function($rootScope) {
		return {
			// datetime functions
			today: function() {
				var today = new Date();
				today.setHours(0);
				today.setMinutes(0);
				today.setSeconds(0);
				return today;
			},
			yesterday: function() {
				return this.subtractDay(this.today(), 1);
			},
			tomorrow: function() {
				return this.plusDay(this.today(), 1);
			},
			removeTime: function(_date) {
				var date = new Date(_date);
				date.setHours(0);
				date.setMinutes(0);
				date.setSeconds(0);
				return date;
			},
			subtractDay: function(_date, step) {
				var date = new Date(_date);
				date.setDate(date.getDate() - (step || 1));
				return date;
			},
			plusDay: function(_date, step) {
				var date = new Date(_date);
				date.setDate(date.getDate() + (step || 1));
				return date;
			},
			subtractMonth: function(_date, step) {
				var date = new Date(_date);
				date.setMonth(date.getMonth() - (step || 1))
				return date;
			},
			plusMonth: function(_date, step) {
				var date = new Date(_date);
				date.setMonth(date.getMonth() + (step || 1))
				return date;
			},
			firstMonthDate: function(_date) {
				var date = this.removeTime(_date);
				date.setDate(1);
				return date;
			},
			lastMonthDate: function(_date) {
				var date = new Date(_date);
				return this.plusMonth(this.firstMonthDate(_date), 1);
			}
		};
	}
]);