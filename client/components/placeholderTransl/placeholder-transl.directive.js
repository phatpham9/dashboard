'use strict';

angular
	.module(window.APP.modules.main)
	.directive('placeholderTransl', placeholderTransl);

placeholderTransl.$inject = ['translate'];
function placeholderTransl(translate) {
    return {
        restrict: 'A',
        scope: {
            str: '=placeholderTransl'
        },
        link: linkFunc
    };

    function linkFunc(scope, elem, attrs) {
        var array = scope.str.split(':');
        var texts = [];
        if (array[1]) {
            try {
                texts = JSON.parse(array[1]);
            } catch(err) {
                console.error('Invalid translate value');
            }
        }
        elem[0].placeholder = translate(array[0], texts);
    }
}