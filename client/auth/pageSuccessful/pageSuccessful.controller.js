'use strict';

angular
    .module(window.APP.modules.auth)
    .controller('pageSuccessful', pageSuccessfulController);

pageSuccessfulController.$inject = ['$stateParams'];
function pageSuccessfulController($stateParams) {
    var vm = this;
    
    switch($stateParams.page) {
        case 'signup':
            vm.title = 'SIGN_UP_SUCCESS_TITLE';
            vm.message = 'SIGN_UP_SUCCESS_MESSAGE';
            break;
        case 'forgot-password':
            vm.title = 'RESET_PASSWORD_REQUEST_SUCCESS_TITLE';
            vm.message = 'RESET_PASSWORD_REQUEST_SUCCESS_MESSAGE';
            break;
        case 'reset-password':
            vm.title = 'RESET_PASSWORD_SUCCESS_TITLE';
            vm.message = 'RESET_PASSWORD_SUCCESS_MESSAGE';
            break;
    }
}