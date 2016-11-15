'use strict';

angular
    .module(window.APP.modules.auth)
    .controller('login', loginController);

loginController.$inject = ['$scope', '$state', '$stateParams', 'translate', 'authAPI', 'user'];
function loginController($scope, $state, $stateParams, translate, authAPI, user) {
    $scope.auth = {
        login: undefined,
        password: undefined
    };
    $scope.validationErrors = undefined;
    $scope.login = login;

    // public functions
    function login(form) {
        if (form.$valid) {
            authAPI.login($scope.auth, function(_user) {
                user.login(_user);
                if ($stateParams.redirectState && $stateParams.redirectState !== 'home') {
                    if ($stateParams.params) {
                        $state.go($stateParams.redirectState, JSON.parse($stateParams.params));
                    } else {
                        $state.go($stateParams.redirectState);
                    }
                } else {
                    $state.go('home');
                }
            }, function(res) {
                $scope.validationErrors = translate('USERNAME_OR_PASSWORD_INCORRECT');
            });
        }
    };
}