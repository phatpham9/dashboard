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
        controller: controllerFunc
    };

    controllerFunc.$inject(['$scope', 'user']);
    function controllerFunc($scope, user) {
        $scope.isLoggedin = user.isLoggedin;
    }
}