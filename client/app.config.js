'use strict';

angular
    .module(window.APP.modules.main)
    .constant('APP', window.APP)
    .config(appConfig)
    .run(appRun);

appConfig.$inject = ['$httpProvider', '$compileProvider', '$urlRouterProvider'];
function appConfig($httpProvider, $compileProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('httpResponseError');
    $compileProvider.debugInfoEnabled(false);
    $urlRouterProvider.otherwise('/');
}

appRun.$inject = ['$rootScope', 'logger', 'connection', 'pageTitle', 'progressbar', 'language', 'setting', 'user', 'auth'];
function appRun($rootScope, logger, connection, pageTitle, progressbar, language, setting, user, auth) {
    logger.init();
    connection.init();
    pageTitle.init();
    progressbar.init();

    $rootScope.LANGUAGE = new language();
    $rootScope.SETTING = new setting();
    $rootScope.USER = new user();
    $rootScope.AUTH = new auth();
}