'use strict';

angular.module(window.APP.modules.auth)

.controller('login', ['$scope', '$state', '$stateParams', '$filter', 'authAPI',
    function($scope, $state, $stateParams, $filter, authAPI) {
        $scope.auth = {
            login: undefined,
            password: undefined
        };
        $scope.validationErrors = undefined;

        // public functions
        $scope.login = function(form) {
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
                    $scope.validationErrors = $filter('translate')('USERNAME_OR_PASSWORD_INCORRECT');
                });
            }
        };
    }
])

.controller('signup', ['$scope', '$state', '$filter', 'authAPI',
    function($scope, $state, $filter, authAPI) {
        $scope.auth = {
            email: undefined,
            password: undefined
        };
        $scope.validationErrors = {};
        $scope.terms = '<a href="#">' + $filter('translate')('TERMS') + '</a>';
        $scope.policies = '<a href="#">' + $filter('translate')('POLICIES') + '</a>';

        $scope.signup = function(form) {
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
])

.controller('forgotPassword', ['$scope', '$state', '$filter', 'authAPI',
    function($scope, $state, $filter, authAPI) {
        $scope.auth = {
            email: null
        };
        $scope.validationErrors = {};

        $scope.forgotPassword = function(form) {
            if (form.$valid) {
                authAPI.forgotPassword($scope.auth, function(res) {
                    $scope.validationErrors.email = null;
                    $state.go('page-successful', {page: 'forgot-password'});
                }, function(res) {
                    if (res.data.validationErrors) {
                        $scope.validationErrors = res.data.validationErrors;
                    }
                });
            }
        };
    }
])

.controller('resetPassword', ['$scope', '$state', '$stateParams', '$filter', 'authAPI',
    function($scope, $state, $stateParams, $filter, authAPI) {
        $scope.auth = {
            token: $stateParams.tokenId,
            password: null,
            confirmPassword: null
        };
        $scope.validationErrors = {};

        $scope.resetPassword = function(form) {
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
])

.controller('pageSuccessful', ['$scope', '$state', '$stateParams', '$filter',
    function($scope, $state, $stateParams, $filter) {
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
]);
