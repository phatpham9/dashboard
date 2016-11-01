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
        controller: controllerFunc
    };

    controllerFunc.$inject(['$scope', '$state', 'siteMenubar', 'settingAPI']);
    function controllerFunc($scope, $state, siteMenubar, settingAPI) {
        $scope.menubar = [];

        $scope.$watch('USER._id', watchUserId);
        $scope.activeItem = activeItem;

        // functions
        function watchUserId(userId) {
            if (userId) {
                getMenubar({
                    _id: 'MENUBAR'
                }, function(menubar) {
                    $scope.menubar = [].concat(menubar.main, menubar.settings);
                    siteMenubar.init();
                });
            } else {
                $scope.menubar = [];
            }
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
}