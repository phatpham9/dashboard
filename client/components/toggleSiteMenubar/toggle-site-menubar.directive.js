'use strict';

angular
    .module(window.APP.modules.main)
    .directive('toggleSiteMenubar', ['siteMenubar',
        function(siteMenubar) {
            return {
                restrict: 'A',
                scope: true,
                link: linkFunc
            };

            function linkFunc(scope, elem, attrs) {
                elem.on('click', function(event) {
                    if (!attrs.toggleSiteMenubar || attrs.toggleSiteMenubar === Breakpoints.current().name) {
                        siteMenubar.toggle();
                    }
                });
                elem.on('$destroy', function(event) {
                    elem.off('click');
                });
            }
        }
    ]);