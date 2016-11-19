'use strict';

angular
    .module(window.APP.modules.auth)
    .controller('signup', signupController);

signupController.$inject = ['$state', 'translate', 'authAPI'];
function signupController($state, translate, authAPI) {
    var vm = this;
    
    vm.auth = {
        email: undefined,
        password: undefined
    };
    vm.signup = signup;

    // functions
    function signup(form) {
        if (form.$valid) {
            authAPI.signup(vm.auth, function(user) {
                vm.validationErrors.email = undefined;
                $state.go('page-successful', {page: 'signup'});
            }, function(res) {
                if (res.data.validationErrors) {
                    vm.validationErrors = res.data.validationErrors;
                }
            });
        }
    };
}