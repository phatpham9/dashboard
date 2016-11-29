'use strict';

angular
    .module(window.APP.modules.main)
    .directive('appVersion', appVersion);

appVersion.$inject = ['APP'];

function appVersion(APP) {
    return {
        restrict: 'EA',
        scope: true,
        link: linkFunc
    };

    function linkFunc(scope, elem, attrs) {
        elem[0].innerText = APP.title + ' v' + APP.version;
    }
}