'use strict';

angular.module(window.APP.modules.home, [
    'ui.router',
    'oc.lazyLoad'
])

.config(['$stateProvider', '$ocLazyLoadProvider',
    function($stateProvider, $ocLazyLoadProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/components/home/views/index.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/components/home/controller.js',
                        ]);
                    }]
                },
                auth: {
                    requiresLogin: true
                }
            });
    }
]);