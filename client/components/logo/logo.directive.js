'use strict';

angular
	.module(window.APP.modules.main)
	.directive('logo', logo);

logo.$inject = [];
function logo() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
        	color: '@color'
        },
        template: '<img ng-src="{{::vm.logoUrl}}">',
        controller: logoController,
        controllerAs: 'vm',
        bindToController: true
    };
}

logoController.$inject = [];
function logoController() {
    var vm = this;

    if (vm.color) {
        vm.logoUrl = '/assets/images/logo-48-' + vm.color + '.png';
    } else {
        vm.logoUrl = '/assets/images/logo-48.png';
    }
}