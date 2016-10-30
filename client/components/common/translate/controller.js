'use strict';

angular.module(window.APP.modules.main)

.directive('ngBindTransl', ['translate',
    function(translate) {
        return {
            restrict: 'A',
            scope: {
                str: '=ngBindTransl'
            },
            link: function(scope, elem, attrs) {
            	var array = scope.str.split(':');
                var texts = [];
            	if (array[1]) {
	            	try {
	            		texts = JSON.parse(array[1]);
	            	} catch(err) {
	            		console.error('Invalid translate value');
	            	}
	            }
                elem[0].innerText = translate(array[0], texts);
            }
        };
    }
])

.directive('placeholderTransl', ['translate',
    function(translate) {
        return {
            restrict: 'A',
            scope: {
                str: '=placeholderTransl'
            },
            link: function(scope, elem, attrs) {
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
        };
    }
]);