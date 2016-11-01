'use strict';

angular
    .module(window.APP.modules.auth)
    .controller('forgotPassword', ['$scope', '$state', 'authAPI',
        function($scope, $state, authAPI) {
            $scope.auth = {
                email: undefined
            };
            $scope.validationErrors = {};
            $scope.forgotPassword = forgotPassword;

            // functions
            function forgotPassword(form) {
                if (form.$valid) {
                    authAPI.forgotPassword($scope.auth, function(res) {
                        $scope.validationErrors.email = undefined;
                        $state.go('page-successful', {page: 'forgot-password'});
                    }, function(res) {
                        if (res.data.validationErrors) {
                            $scope.validationErrors = res.data.validationErrors;
                        }
                    });
                }
            };
        }
    ]);