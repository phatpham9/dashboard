'use strict';

angular.module(window.APP.modules.group, [
    'ui.router',
    'oc.lazyLoad',
    'checklist-model'
])

.config(['$stateProvider', '$ocLazyLoadProvider',
    function($stateProvider, $ocLazyLoadProvider) {
        $stateProvider
            .state('groups', {
                url: '/groups?query&sort&page&limit&filter',
                templateUrl: '/components/group/views/index.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/components/group/controller.js',
                            '/apis/group.js'
                        ]);
                    }]
                },
                auth: {
                    requiresLogin: true,
                    allows: {
                        group: ['get', 'post', 'put', 'delete']
                    }
                }
            })
            .state('groupCreate', {
                url: '/groups/create',
                templateUrl: '/components/group/views/details.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/components/group/controller.js',
                            '/apis/group.js',

                            '/apis/user.js',
                            '/apis/setting.js'
                        ]);
                    }]
                },
                auth: {
                    requiresLogin: true,
                    allows: {
                        setting: ['post']
                    }
                }
            })
            .state('groupDetails', {
                url: '/groups/:groupId',
                templateUrl: '/components/group/views/details.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/components/group/controller.js',
                            '/apis/group.js',

                            '/apis/user.js',
                            '/apis/setting.js'
                        ]);
                    }]
                },
                auth: {
                    requiresLogin: true,
                    allows: {
                        setting: ['get', 'put']
                    }
                }
            });
    }
]);
