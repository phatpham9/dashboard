'use strict';

angular
    .module(window.APP.modules.main)
    .directive('toggleSubmenu', toggleSubmenu);

toggleSubmenu.$inject = ['siteMenubar'];
function toggleSubmenu(siteMenubar) {
    return {
        restrict: 'A',
        scope: true,
        link: linkFunc
    };

    function linkFunc(scope, elem, attr) {
        elem.on('click', function() {
            if (!$('body').hasClass('site-menubar-fold')) {
                elem.parent('.site-menu-item').toggleClass('open');
            }
        });
        elem.on('$destroy', function() {
            elem.off('click');
        });
    }
}