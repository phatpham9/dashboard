'use strict';

angular
    .module(window.APP.modules.main, [
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
    ]);