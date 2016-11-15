'use strict';

angular
	.module(window.APP.modules.main)
	.directive('siteNavbar', siteNavbar);

siteNavbar.$inject = [];
function siteNavbar() {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/components/siteNavbar/site-navbar.html',
        controller: controllerFunc
    };

    controllerFunc.$inject(['$scope', 'user']);
    function controllerFunc($scope, user) {
        $scope.isLoggedin = user.isLoggedin;
    }
}