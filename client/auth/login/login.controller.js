'use strict';

angular
    .module(window.APP.modules.auth)
    .controller('login', ['$scope', '$state', '$stateParams', 'translate', 'authAPI',
        function($scope, $state, $stateParams, translate, authAPI) {
            $scope.auth = {
                login: undefined,
                password: undefined
            };
            $scope.validationErrors = undefined;
            $scope.login = login;

            // public functions
            function login(form) {
                if (form.$valid) {
                    authAPI.login($scope.auth, function(user) {
                        $scope.USER.login(user);
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
    ]);