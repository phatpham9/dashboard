'use strict';

angular.module(window.APP.modules.setting, [
    'ui.router',
    'oc.lazyLoad'
])

.config(['$stateProvider', '$ocLazyLoadProvider',
    function($stateProvider, $ocLazyLoadProvider) {
        $stateProvider
            .state('settings', {
                url: '/settings/configurations',
                templateUrl: '/components/setting/views/index.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/components/setting/controller.js',
                            '/apis/setting.js'
                        ]);
                    }]
                },
                auth: {
                    requiresLogin: true,
                    allows: {
                        setting: ['get', 'post', 'put', 'delete']
                    }
                }
            })
            .state('settingCreate', {
                url: '/settings/configurations/create',
                templateUrl: '/components/setting/views/details.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/components/setting/controller.js',
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
            .state('settingDetails', {
                url: '/settings/configurations/:settingId',
                templateUrl: '/components/setting/views/details.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/components/setting/controller.js',
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
