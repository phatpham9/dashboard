'use strict';

angular
    .module(window.APP.modules.auth)
    .controller('resetPassword', resetPasswordController);

resetPasswordController.$inject = ['$state', '$stateParams', 'authAPI'];
function resetPasswordController($state, $stateParams, authAPI) {
    vm.auth = {
        token: $stateParams.tokenId,
        password: undefined,
        confirmPassword: undefined
    };
    vm.validationErrors = {};
    vm.resetPassword = resetPassword;

    // functions
    function resetPassword(form) {
        if (form.$valid) {
            authAPI.resetPassword(vm.auth, function(data) {
                $state.go('page-successful', {page: 'reset-password'});
            }, function(res) {
                if (res.data.validationErrors) {
                    vm.validationErrors = res.data.validationErrors;
                }
            });
        }
    };
}