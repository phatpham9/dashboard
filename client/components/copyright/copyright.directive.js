'use strict';

angular
	.module(window.APP.modules.main)
	.directive('copyright', copyright);

copyright.$inject = ['APP'];
function copyright(APP) {
    return {
        restrict: 'EA',
        scope: true,
        template: APP.author.name + ' © ' + APP.year
    };
}