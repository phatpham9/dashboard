'use strict';

angular
    .module(window.APP.modules.main)
    .directive('toggleSiteMenubar', toggleSiteMenubar);

toggleSiteMenubar.$inject = ['siteMenubar'];
function toggleSiteMenubar(siteMenubar) {
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