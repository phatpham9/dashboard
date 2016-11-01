'use strict';

angular
    .module(window.APP.modules.auth)
    .controller('pageSuccessful', pageSuccessfulController);

pageSuccessfulController.$inject = ['$scope', '$state', '$stateParams'];
function pageSuccessfulController($scope, $state, $stateParams) {
    switch($stateParams.page) {
        case 'signup':
            $scope.title = 'SIGN_UP_SUCCESS_TITLE';
            $scope.message = 'SIGN_UP_SUCCESS_MESSAGE';
            break;
        case 'forgot-password':
            $scope.title = 'RESET_PASSWORD_REQUEST_SUCCESS_TITLE';
            $scope.message = 'RESET_PASSWORD_REQUEST_SUCCESS_MESSAGE';
            break;
        case 'reset-password':
            $scope.title = 'RESET_PASSWORD_SUCCESS_TITLE';
            $scope.message = 'RESET_PASSWORD_SUCCESS_MESSAGE';
            break;
    }
}