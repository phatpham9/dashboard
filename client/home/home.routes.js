'use strict';

angular
    .module(window.APP.modules.home)
    .config(['$stateProvider', '$ocLazyLoadProvider',
        function($stateProvider, $ocLazyLoadProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '/home/home.html',
                    resolve: {
                        resources: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/home/home.controller.js',
                            ]);
                        }]
                    },
                    controller: 'home',
                    auth: {
                        requiresLogin: true
                    }
                });
        }
    ]);