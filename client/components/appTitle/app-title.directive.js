'use strict';

angular
    .module(window.APP.modules.main)
    .directive('appTitle', ['APP',
        function(APP) {
            return {
                restrict: 'EA',
                scope: true,
                link: linkFunc
            };
    
            function linkFunc(scope, elem, attrs) {
                elem[0].innerText = APP.title;
            }
        }
    ]);