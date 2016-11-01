'use strict';

angular
    .module(window.APP.modules.home)
    .config(homeRoutes);

homeRoutes.$inject = ['$stateProvider', '$ocLazyLoadProvider'];
function homeRoutes($stateProvider, $ocLazyLoadProvider) {
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