'use strict';

angular
    .module(window.APP.modules.auth)
    .controller('signup', signupController);

signupController.$inject = ['$scope', '$state', 'translate', 'authAPI'];
function signupController($scope, $state, translate, authAPI) {
    $scope.auth = {
        email: undefined,
        password: undefined
    };
    $scope.signup = signup;

    // functions
    function signup(form) {
        if (form.$valid) {
            authAPI.signup($scope.auth, function(user) {
                $scope.validationErrors.email = undefined;
                $state.go('page-successful', {page: 'signup'});
            }, function(res) {
                if (res.data.validationErrors) {
                    $scope.validationErrors = res.data.validationErrors;
                }
            });
        }
    };
}