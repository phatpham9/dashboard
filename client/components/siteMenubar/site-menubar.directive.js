'use strict';

angular
    .module(window.APP.modules.main)
    .directive('siteMenubar', siteMenubar);

siteMenubar.$inject = [];
function siteMenubar() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/components/siteMenubar/site-menubar.html',
        controller: siteMenubarControllerFunc
    };
}

siteMenubarControllerFunc.$inject = ['$scope', '$state', 'siteMenubar', 'settingAPI', 'user', 'auth'];
function siteMenubarControllerFunc($scope, $state, siteMenubar, settingAPI, user, auth) {
    $scope.menubar = [];
    $scope.activeItem = activeItem;
    $scope.isLoggedin = user.isLoggedin;
    $scope.isAllowed = auth.isAllowed;
    $scope.$on('userLoggedin', init);
    $scope.$on('userLoggedout', onLogout);
    init();

    // functions
    function init() {
        if (user.isLoggedin()) {
            getMenubar({
                _id: 'MENUBAR'
            }, function(menubar) {
                $scope.menubar = [].concat(menubar.main, menubar.settings);
                siteMenubar.init();
            });
        }
    }
    function onLogout() {
        $scope.menubar = [];
    }
    function activeItem(activeStates) {
        return activeStates && activeStates.indexOf($state.current.name) !== -1;
    }
    function getMenubar(query, cb) {
        settingAPI.get(query, function(setting) {
            if (cb) {
                cb(setting.value);
            }
        });
    }
}