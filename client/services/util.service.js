'use strict';

angular
	.module(window.APP.modules.main)
	.service('util', util);

util.$inject = [];
function util() {
	var service = {
		today: today,
		yesterday: yesterday,
		tomorrow: tomorrow,
		removeTime: removeTime,
		subtractDay: subtractDay,
		plusDay: plusDay,
		subtractMonth: subtractMonth,
		plusMonth: plusMonth,
		firstMonthDate: firstMonthDate,
		lastMonthDate: lastMonthDate
	};
	
	return service;

	// datetime functions
	function today() {
		var today = new Date();
		today.setHours(0);
		today.setMinutes(0);
		today.setSeconds(0);
		return today;
	}
	function yesterday() {
		return service.subtractDay(service.today(), 1);
	}
	function tomorrow() {
		return service.plusDay(service.today(), 1);
	}
	function removeTime(_date) {
		var date = new Date(_date);
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		return date;
	}
	function subtractDay(_date, step) {
		var date = new Date(_date);
		date.setDate(date.getDate() - (step || 1));
		return date;
	}
	function plusDay(_date, step) {
		var date = new Date(_date);
		date.setDate(date.getDate() + (step || 1));
		return date;
	}
	function subtractMonth(_date, step) {
		var date = new Date(_date);
		date.setMonth(date.getMonth() - (step || 1))
		return date;
	}
	function plusMonth(_date, step) {
		var date = new Date(_date);
		date.setMonth(date.getMonth() + (step || 1))
		return date;
	}
	function firstMonthDate(_date) {
		var date = service.removeTime(_date);
		date.setDate(1);
		return date;
	}
	function lastMonthDate(_date) {
		var date = new Date(_date);
		return service.plusMonth(service.firstMonthDate(_date), 1);
	}
}