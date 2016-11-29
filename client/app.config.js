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

appRun.$inject = ['language', 'logger', 'connection', 'pageTitle', 'progressbar', 'setting', 'user', 'auth'];
function appRun(language, logger, connection, pageTitle, progressbar, setting, user, auth) {
    language.init();
    logger.init();
    connection.init();
    pageTitle.init();
    progressbar.init();
    setting.init();
    user.init();
    auth.init();
}