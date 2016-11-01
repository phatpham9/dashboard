'use strict';

angular
    .module(window.APP.modules.group)
    .config(groupRoutes);

groupRoutes.$inject = ['$stateProvider', '$ocLazyLoadProvider'];
function groupRoutes($stateProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('groups', {
            url: '/groups?query&sort&page&limit&filter',
            templateUrl: '/group/groups/groups.html',
            resolve: {
                resources: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '/group/groups/groups.controller.js',
                        '/apis/groupAPI.service.js'
                    ]);
                }]
            },
            controller: 'groups',
            auth: {
                requiresLogin: true,
                allows: {
                    group: ['get', 'post', 'put', 'delete']
                }
            }
        })
        .state('groupCreate', {
            url: '/groups/create',
            templateUrl: '/group/groupDetails/groupDetails.html',
            resolve: {
                resources: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '/group/groupDetails/groupDetails.controller.js',
                        '/apis/groupAPI.service.js',

                        '/apis/userAPI.service.js',
                        '/apis/settingAPI.service.js'
                    ]);
                }]
            },
            controller: 'groupDetails',
            auth: {
                requiresLogin: true,
                allows: {
                    setting: ['post']
                }
            }
        })
        .state('groupDetails', {
            url: '/groups/:groupId',
            templateUrl: '/group/groupDetails/groupDetails.html',
            resolve: {
                resources: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '/group/groupDetails/groupDetails.controller.js',
                        '/apis/groupAPI.service.js',

                        '/apis/userAPI.service.js',
                        '/apis/settingAPI.service.js'
                    ]);
                }]
            },
            controller: 'groupDetails',
            auth: {
                requiresLogin: true,
                allows: {
                    setting: ['get', 'put']
                }
            }
        });
}