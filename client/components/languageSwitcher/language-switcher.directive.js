'use strict';

angular
    .module(window.APP.modules.main)
    .directive('languageSwitcher', languageSwitcher);

languageSwitcher.$inject = ['language'];
function languageSwitcher(language) {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/components/languageSwitcher/language-switcher.html',
        link: linkFunc
    };

    function linkFunc(scope) {
        scope.locale = language.locale;
        scope.switch = language.switch;
        scope.languages = [{
            key: 'en',
            name: 'English',
            icon: 'flag-icon-us'
        }, {
            key: 'vi',
            name: 'Việt Nam',
            icon: 'flag-icon-vn'
        }];
    }
}