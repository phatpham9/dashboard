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
        controller: siteMenubarControllerFunc,
        controllerAs: 'vm'
    };
}

siteMenubarControllerFunc.$inject = ['$rootScope', '$state', 'siteMenubar', 'settingAPI', 'user', 'auth'];
function siteMenubarControllerFunc($rootScope, $state, siteMenubar, settingAPI, user, auth) {
    var vm = this;
    
    vm.menubar = [];
    vm.activeItem = activeItem;
    vm.isLoggedin = user.isLoggedin;
    vm.isAllowed = auth.isAllowed;

    $rootScope.$on('userLoggedin', init);
    $rootScope.$on('userLoggedout', onLogout);
    init();

    // functions
    function init() {
        if (user.isLoggedin()) {
            getMenubar({
                _id: 'MENUBAR'
            }, function(menubar) {
                vm.menubar = [].concat(menubar.main, menubar.settings);
                siteMenubar.init();
            });
        }
    }
    function onLogout() {
        vm.menubar = [];
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