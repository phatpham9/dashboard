'use strict';

angular.module(window.APP.modules.main, [
    // sub-modules
    window.APP.modules.auth,
    window.APP.modules.home,
    window.APP.modules.setting,
    window.APP.modules.group,
    window.APP.modules.user,
    // vendors
    'ui.router',
    'oc.lazyLoad',
    'ngResource',
    'ui.bootstrap',
    'ngCookies',
    'ngAlertify',
    'ngProgress'
])

.constant('APP', window.APP)

.config(['$httpProvider', '$compileProvider', '$urlRouterProvider',
    function($httpProvider, $compileProvider, $urlRouterProvider) {
        $httpProvider.interceptors.push('httpResponseError');
        $compileProvider.debugInfoEnabled(false);
        $urlRouterProvider.otherwise('/');
    }
])

.run(['APP', '$rootScope', 'alertify', 'connection', 'pageTitle', 'progressbar', 'language', 'setting', 'user', 'auth',
    function(APP, $rootScope, alertify, connection, pageTitle, progressbar, language, setting, user, auth) {
        alertify.logPosition('bottom right').maxLogItems(3);
        $rootScope.APP = APP;
        $rootScope.CONNECTION = new connection();
        $rootScope.PAGETITLE = new pageTitle();
        $rootScope.PROGRESSBAR = new progressbar();
        $rootScope.LANGUAGE = new language();
        $rootScope.SETTING = new setting();
        $rootScope.USER = new user();
        $rootScope.AUTH = new auth();

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            var authPages = ['login', 'forgot-password', 'reset-password', 'page-successful'];
            if (authPages.indexOf(toState.name) !== -1) {
                $('body').addClass('page-auth layout-full page-dark');
            } else {
                $('body').removeClass('page-auth layout-full page-dark');
            }
        });
    }
]);