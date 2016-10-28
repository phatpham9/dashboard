'use strict';

angular.module(window.APP.modules.main)

.directive('toggleSiteMenubar', ['siteMenubar',
    function(siteMenubar) {
        return {
            restrict: 'A',
            link: function(scope, elem, attr) {
                elem.on('click', function() {
                    siteMenubar.toggle();
                });
                scope.$on('$destroy', function() {
                    elem.off('click');
                });
            }
        };
    }
]);