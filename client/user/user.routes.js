'use strict';

angular
    .module(window.APP.modules.user)
    .config(['$stateProvider', '$ocLazyLoadProvider',
        function($stateProvider, $ocLazyLoadProvider) {
            $stateProvider
                .state('users', {
                    url: '/settings/users?query&sort&page&limit&filter',
                    templateUrl: '/user/users/users.html',
                    resolve: {
                        resources: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/user/users/users.controller.js',
                                '/apis/userAPI.service.js'
                            ]);
                        }]
                    },
                    controller: 'users',
                    auth: {
                        requiresLogin: true,
                        allows: {
                            user: ['get', 'post', 'put', 'delete']
                        }
                    }
                })
                .state('userCreate', {
                    url: '/settings/users/create',
                    templateUrl: '/user/userDetails/userDetails.html',
                    resolve: {
                        resources: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/user/userDetails/userDetails.controller.js',
                                '/apis/userAPI.service.js',

                                '/apis/groupAPI.service.js'
                            ]);
                        }]
                    },
                    controller: 'userDetails',
                    auth: {
                        requiresLogin: true,
                        allows: {
                            user: ['post']
                        }
                    }
                })
                .state('userDetails', {
                    url: '/settings/users/:userId',
                    templateUrl: '/user/userDetails/userDetails.html',
                    resolve: {
                        resources: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/user/userDetails/userDetails.controller.js',
                                '/apis/userAPI.service.js',

                                '/apis/groupAPI.service.js'
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
                    controller: 'userDetails',
                    auth: {
                        requiresLogin: true,
                        allows: {
                            user: ['get', 'put']
                        }
                    }
                })
                .state('profile', {
                    url: '/settings/profile',
                    templateUrl: '/user/userDetails/userDetails.html',
                    resolve: {
                        resources: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/user/userDetails/userDetails.controller.js',
                                '/apis/userAPI.service.js',

                                '/apis/groupAPI.service.js'
                            ]);
                        }]
                    },
                    controller: 'userDetails',
                    auth: {
                        requiresLogin: true
                    }
                });
        }
    ]);
