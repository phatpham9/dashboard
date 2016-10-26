'use strict';

angular.module(window.APP.modules.user, [
    'ui.router',
    'oc.lazyLoad'
])

.config(['$stateProvider', '$ocLazyLoadProvider',
    function($stateProvider, $ocLazyLoadProvider) {
        $stateProvider
            .state('users', {
                url: '/settings/users?query&sort&page&limit&filter',
                templateUrl: '/components/user/views/index.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/components/user/controller.js',
                            '/apis/user.js'
                        ]);
                    }]
                },
                auth: {
                    requiresLogin: true,
                    allows: {
                        user: ['get', 'post', 'put', 'delete']
                    }
                }
            })
            .state('userCreate', {
                url: '/settings/users/create',
                templateUrl: '/components/user/views/details.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/components/user/controller.js',
                            '/apis/user.js',

                            '/apis/group.js'
                        ]);
                    }]
                },
                auth: {
                    requiresLogin: true,
                    allows: {
                        user: ['post']
                    }
                }
            })
            .state('userDetails', {
                url: '/settings/users/:userId',
                templateUrl: '/components/user/views/details.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/components/user/controller.js',
                            '/apis/user.js',

                            '/apis/group.js'
                        ]);
                    }],
                    redirect: ['$rootScope', '$state', '$stateParams', '$q', '$timeout',
                        function($rootScope, $state, $stateParams, $q, $timeout) {
                            var deferred = $q.defer();
                            $timeout(function() {
                                if ($rootScope.USER.isMe($stateParams.userId)) {
                                    $state.go('profile');
                                    deferred.reject();
                                } else {
                                    deferred.resolve();
                                }
                            });
                            return deferred.promise;
                        }
                    ]
                },
                auth: {
                    requiresLogin: true,
                    allows: {
                        user: ['get', 'put']
                    }
                }
            })
            .state('profile', {
                url: '/settings/profile',
                templateUrl: '/components/user/views/details.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/components/user/controller.js',
                            '/apis/user.js',

                            '/apis/group.js'
                        ]);
                    }]
                },
                auth: {
                    requiresLogin: true
                }
            });
    }
]);
