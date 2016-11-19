'use strict';

angular
    .module(window.APP.modules.auth)
    .controller('forgotPassword', forgotPasswordController);

forgotPasswordController.$inject = ['$state', 'authAPI'];
function forgotPasswordController($state, authAPI) {
    var vm = this;
    
    vm.auth = {
        email: undefined
    };
    vm.validationErrors = {};
    vm.forgotPassword = forgotPassword;

    // functions
    function forgotPassword(form) {
        if (form.$valid) {
            authAPI.forgotPassword(vm.auth, function(res) {
                vm.validationErrors.email = undefined;
                $state.go('page-successful', {page: 'forgot-password'});
            }, function(res) {
                if (res.data.validationErrors) {
                    vm.validationErrors = res.data.validationErrors;
                }
            });
        }
    };
}