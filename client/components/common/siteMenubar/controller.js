'use strict';

angular.module(window.APP.modules.main)

.directive('siteMenubar', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/components/common/siteMenubar/view.html',
        controller: ['$scope', '$state', '$filter', 'siteMenubar', 'settingAPI',
            function($scope, $state, $filter, siteMenubar, settingAPI) {
                $scope.menubar = [];

                // watchers
                $scope.$watch('USER._id', function(userId) {
                    if (userId) {
                        getMenubar({
                            _id: 'MENUBAR'
                        }, function(menubar) {
                            $scope.menubar = [].concat(menubar.main, menubar.settings);
                            // init menubar
                            siteMenubar.init();
                        });
                    } else {
                        $scope.menubar = [];
                    }
                });
                $scope.toggleMenubar = function() {
                    var breakpoint = Breakpoints.current();
                    if (breakpoint.name === 'xs') {
                        siteMenubar.toggle();
                    }
                };
                $scope.toggleSubmenu = function(event) {
                    if (!$('body').hasClass('site-menubar-fold')) {
                        angular.element(event.currentTarget).parent('.site-menu-item').toggleClass('open');
                    }
                };
                $scope.activeItem = function(activeStates) {
                    return activeStates && activeStates.indexOf($state.current.name) !== -1;
                };
                // private functions
                function getMenubar(query, cb) {
                    settingAPI.get(query, function(setting) {
                        if (cb) {
                            cb(setting.value);
                        }
                    });
                }
            }
        ]
    };
});