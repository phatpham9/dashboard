'use strict';

angular.module(window.APP.modules.main)

.directive('toggleSiteMenubar', ['siteMenubar',
    function(siteMenubar) {
        return {
            restrict: 'A',
            link: function(scope, elem, attr) {
                elem.bind('click', function() {
                    siteMenubar.toggle();
                });
            }
        };
    }
]);