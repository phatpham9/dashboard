'use strict';

angular
	.module(window.APP.modules.main)
	.directive('siteFooter', siteFooter);

siteFooter.$inject = [];
function siteFooter() {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/components/siteFooter/site-footer.html',
        controller: siteFooterControllerFunc,
        controllerAs: 'vm'
    };
}

siteFooterControllerFunc.$inject = ['user'];
function siteFooterControllerFunc(user) {
    var vm = this;
    
    vm.isLoggedin = user.isLoggedin;
}