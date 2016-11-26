'use strict';

angular
    .module(window.APP.modules.main)
    .directive('languageSwitcher', languageSwitcher);

languageSwitcher.$inject = [];
function languageSwitcher() {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        templateUrl: '/components/languageSwitcher/language-switcher.html',
        controller: languageSwitcherController,
        controllerAs: 'vm'
    };
}
languageSwitcherController.$inject = ['language'];
function languageSwitcherController(language) {
    var vm = this;
    
    vm.locale = language.locale;
    vm.switch = language.switch;
    vm.languages = [{
        key: 'us',
        name: 'English',
        icon: 'flag-icon-us'
    }, {
        key: 'vn',
        name: 'Việt Nam',
        icon: 'flag-icon-vn'
    }];
}