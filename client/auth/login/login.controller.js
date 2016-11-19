'use strict';

angular
    .module(window.APP.modules.auth)
    .controller('login', loginController);

loginController.$inject = ['$state', '$stateParams', 'translate', 'authAPI', 'user'];
function loginController($state, $stateParams, translate, authAPI, user) {
    var vm = this;
    
    vm.auth = {
        login: undefined,
        password: undefined
    };
    vm.validationErrors = undefined;
    vm.login = login;

    // public functions
    function login(form) {
        if (form.$valid) {
            authAPI.login(vm.auth, function(_user) {
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
                vm.validationErrors = translate('USERNAME_OR_PASSWORD_INCORRECT');
            });
        }
    };
}