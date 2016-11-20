'use strict';

angular
	.module(window.APP.modules.main)
	.directive('madeWithLove', madeWithLove);

madeWithLove.$inject = [];
function madeWithLove() {
    return {
        restrict: 'EA',
        scope: true,
        templateUrl: '/components/madeWithLove/made-with-love.html',
        controller: madeWithLoveController,
        controllerAs: 'vm'
    };
}

madeWithLoveController.$inject = ['APP']
function madeWithLoveController(APP) {
    var vm = this;
    
    vm.location = APP.author.location;
}