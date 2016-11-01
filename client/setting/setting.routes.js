'use strict';

angular
    .module(window.APP.modules.setting)
    .config(settingRoutes);

settingRoutes.$inject = ['$stateProvider', '$ocLazyLoadProvider'];
function settingRoutes($stateProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('settings', {
            url: '/settings/configurations',
            templateUrl: '/setting/settings/settings.html',
            resolve: {
                resources: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '/setting/settings/settings.controller.js',
                        '/apis/settingAPI.service.js'
                    ]);
                }]
            },
            controller: 'settings',
            auth: {
                requiresLogin: true,
                allows: {
                    setting: ['get', 'post', 'put', 'delete']
                }
            }
        })
        .state('settingCreate', {
            url: '/settings/configurations/create',
            templateUrl: '/setting/settingDetails/settingDetails.html',
            resolve: {
                resources: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '/setting/settingDetails/settingDetails.controller.js',
                        '/apis/settingAPI.service.js'
                    ]);
                }]
            },
            controller: 'settingDetails',
            auth: {
                requiresLogin: true,
                allows: {
                    setting: ['post']
                }
            }
        })
        .state('settingDetails', {
            url: '/settings/configurations/:settingId',
            templateUrl: '/setting/settingDetails/settingDetails.html',
            resolve: {
                resources: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '/setting/settingDetails/settingDetails.controller.js',
                        '/apis/settingAPI.service.js'
                    ]);
                }]
            },
            controller: 'settingDetails',
            auth: {
                requiresLogin: true,
                allows: {
                    setting: ['get', 'put']
                }
            }
        });
}