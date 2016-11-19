'use strict';

angular
    .module(window.APP.modules.auth)
    .config(authRoutes);

authRoutes.$inject = ['$stateProvider', '$ocLazyLoadProvider'];
function authRoutes($stateProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('login', {
            url: '/login?redirectState&params',
            templateUrl: '/auth/login/login.html',
            resolve: {
                resources: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '/auth/login/login.controller.js',
                        '/apis/authAPI.service.js'
                    ]);
                }]
            },
            controller: 'login',
            controllerAs: 'vm',
            auth: {
                requiresLogin: false
            }
        })
        .state('signup', {
            url: '/signup',
            templateUrl: '/auth/signup/signup.html',
            resolve: {
                resources: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '/auth/signup/signup.controller.js',
                        '/apis/authAPI.service.js'
                    ]);
                }]
            },
            controller: 'signup',
            controllerAs: 'vm',
            auth: {
                requiresLogin: false
            }
        })
        .state('forgot-password', {
            url: '/forgot-password',
            templateUrl: '/auth/forgotPassword/forgotPassword.html',
            resolve: {
                resources: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '/auth/forgotPassword/forgotPassword.controller.js',
                        '/apis/authAPI.service.js'
                    ]);
                }]
            },
            controller: 'forgotPassword',
            controllerAs: 'vm',
            auth: {
                requiresLogin: false
            }
        })
        .state('page-successful', {
            url: '/:page/successful',
            templateUrl: '/auth/pageSuccessful/pageSuccessful.html',
            resolve: {
                resources: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '/auth/pageSuccessful/pageSuccessful.controller.js'
                    ]);
                }]
            },
            controller: 'pageSuccessful',
            controllerAs: 'vm',
            auth: {
                requiresLogin: false
            }
        })
        .state('reset-password', {
            url: '/reset-password/:tokenId',
            templateUrl: '/auth/resetPassword/resetPassword.html',
            resolve: {
                resources: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '/auth/resetPassword/resetPassword.controller.js',
                        '/apis/authAPI.service.js'
                    ]);
                }]
            },
            controller: 'resetPassword',
            controllerAs: 'vm',
            auth: {
                requiresLogin: false
            }
        })
        .state('logout', {
            url: '/logout',
            resolve: {
                resources: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '/auth/logout/logout.controller.js',
                        '/apis/authAPI.service.js'
                    ]);
                }]
            },
            controller: 'logout',
            controllerAs: 'vm',
            auth: {
                requiresLogin: true
            }
        });
}