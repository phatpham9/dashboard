'use strict';

angular
    .module(window.APP.modules.auth)
    .controller('resetPassword', ['$scope', '$state', '$stateParams', 'authAPI',
        function($scope, $state, $stateParams, authAPI) {
            $scope.auth = {
                token: $stateParams.tokenId,
                password: undefined,
                confirmPassword: undefined
            };
            $scope.validationErrors = {};
            $scope.resetPassword = resetPassword;

            // functions
            function resetPassword(form) {
                if (form.$valid) {
                    authAPI.resetPassword($scope.auth, function(data) {
                        $state.go('page-successful', {page: 'reset-password'});
                    }, function(res) {
                        if (res.data.validationErrors) {
                            $scope.validationErrors = res.data.validationErrors;
                        }
                    });
                }
            };
        }
    ]);