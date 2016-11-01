'use strict';

angular
    .module(window.APP.modules.main)
    .directive('appTitle', appTitle);

appTitle.$inject = ['APP'];
function appTitle(APP) {
    return {
        restrict: 'EA',
        scope: true,
        link: linkFunc
    };

    function linkFunc(scope, elem, attrs) {
        elem[0].innerText = APP.title;
    }
}