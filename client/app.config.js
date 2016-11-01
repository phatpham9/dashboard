'use strict';

angular
    .module(window.APP.modules.main)
    .constant('APP', window.APP)
    .config(['$httpProvider', '$compileProvider', '$urlRouterProvider',
        function($httpProvider, $compileProvider, $urlRouterProvider) {
            $httpProvider.interceptors.push('httpResponseError');
            $compileProvider.debugInfoEnabled(false);
            $urlRouterProvider.otherwise('/');
        }
    ])
    .run(['$rootScope', 'logger', 'connection', 'pageTitle', 'progressbar', 'language', 'setting', 'user', 'auth',
        function($rootScope, logger, connection, pageTitle, progressbar, language, setting, user, auth) {
            logger.init();
            connection.init();
            pageTitle.init();
            progressbar.init();

            $rootScope.LANGUAGE = new language();
            $rootScope.SETTING = new setting();
            $rootScope.USER = new user();
            $rootScope.AUTH = new auth();
        }
    ]);