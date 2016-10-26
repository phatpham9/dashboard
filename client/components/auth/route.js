'use strict';

angular.module(window.APP.modules.auth, [
    'ui.router',
    'oc.lazyLoad'
])

.config(['$stateProvider', '$ocLazyLoadProvider',
    function($stateProvider, $ocLazyLoadProvider) {
        $stateProvider
            .state('login', {
                url: '/login?redirectState&params',
                templateUrl: '/components/auth/views/login.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/components/auth/controller.js',
                            '/apis/auth.js'
                        ]);
                    }]
                },
                auth: {
                    requiresLogin: false
                }
            })
            .state('forgot-password', {
                url: '/forgot-password',
                templateUrl: '/components/auth/views/forgotPassword.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/components/auth/controller.js',
                            '/apis/auth.js'
                        ]);
                    }]
                },
                auth: {
                    requiresLogin: false
                }
            })
            .state('page-successful', {
                url: '/:page/successful',
                templateUrl: '/components/auth/views/pageSuccessful.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/components/auth/controller.js'
                        ]);
                    }]
                },
                auth: {
                    requiresLogin: false
                }
            })
            .state('reset-password', {
                url: '/reset-password/:tokenId',
                templateUrl: '/components/auth/views/resetPassword.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/components/auth/controller.js',
                            '/apis/auth.js'
                        ]);
                    }]
                },
                auth: {
                    requiresLogin: false
                }
            })
            .state('logout', {
                url: '/logout',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/apis/auth.js'
                        ]);
                    }]
                },
                controller: ['$scope', '$state', 'alertify', 'authAPI',
                    function($scope, $state, alertify, authAPI) {
                        authAPI.logout(function() {
                            $scope.USER.logout();
                            $state.go('login');
                        });
                    }
                ],
                auth: {
                    requiresLogin: true
                }
            });
    }
]);
