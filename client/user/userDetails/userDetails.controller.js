'use strict';

angular
    .module(window.APP.modules.user)
    .controller('userDetails', userDetailsController);

userDetailsController.$inject = ['$scope', '$state', '$stateParams', '$modal', 'translate', 'logger', 'userAPI', 'groupAPI'];
function userDetailsController($scope, $state, $stateParams, $modal, translate, logger, userAPI, groupAPI) {
    $scope.validationErrors = {
        email: undefined,
        password: undefined
    };
    $scope.save = save;
    $scope.changePassword = changePassword;
    $scope.delete = deleteFunc;
    init();

    // functions
    function init() {
        if ($state.current.name === 'userCreate') {
            $scope.state = 'create';
            $scope.user = new userAPI({
                email: undefined,
                password: undefined
            });

            getGroups({
                limit: 0,
                page: 0,
                sort: 'name'
            }, function(groups) {
                $scope.groups = groups;
            });
        } else if ($state.current.name === 'userDetails') {
            $scope.state = 'details';
            getUser({
                _id: $stateParams.userId
            }, function(_user) {
                $scope.user = _user;

                getGroups({
                    limit: 0,
                    page: 0,
                    sort: 'name'
                }, function(groups) {
                    $scope.groups = groups;
                });
            });
        } else {
            $scope.state = 'profile';
            getProfile(function(_user) {
                $scope.user = _user;
            });
        }
    }
    function save() {
        if ($scope.form.$valid) {
            if ($scope.state === 'create') {
                if ($scope.user.canCreate()) {
                    createUser($scope.user, function(_user) {
                        $scope.form.$setPristine();
                        $state.go('userDetails', {userId: _user._id});
                    });
                }
            } else if ($scope.state === 'details') {
                if ($scope.user.canEdit()) {
                    updateUser($scope.user, function(_user) {
                        $scope.form.$setPristine();
                        $scope.user = _user;
                    });
                }
            } else {
                updateProfile($scope.user, function(_user) {
                    $scope.form.$setPristine();
                    $scope.user = _user;
                    // update current logged in user info
                    user.login($scope.user);
                });
            }
        }
    }
    function deleteFunc() {
        if ($scope.user.canDelete()) {
            if (confirm(translate('CONFIRM_DELETE_X', $scope.user.email))) {
                deleteUser($scope.user, function(_user) {
                    $scope.form.$setPristine();
                    $state.go('users');
                });
            }
        }
    }
    function changePassword() {
        if ($scope.state === 'profile') {
            var modalInstance = $modal.open({
                backdrop: 'static',
                templateUrl: '/user/changePasswordModal/changePasswordModal.html',
                resolve: {
                    resources: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '/user/changePasswordModal/changePasswordModal.controller.js',
                            '/apis/userAPI.service.js'
                        ]);
                    }],
                    userId: function() {
                        return $scope.user._id;
                    }
                },
                controller: 'changePasswordModal'
            });
        }
    }

    function getUser(query, cb) {
        userAPI.get(query, function(_user) {
            if (cb) {
                cb(_user);
            }
        }, function(res) {
            $state.go('users');
        });
    }
    function createUser(user, cb) {
        user.$save(function(_user) {
            if (cb) {
                cb(_user);
            }
            logger.success(translate('X_HAS_BEEN_CREATED', _user.email));
        }, function(res) {
            if (res.data.validationErrors) {
                $scope.validationErrors = res.data.validationErrors;
            }
        });
    }
    function updateUser(user, cb) {
        user.$update(function(_user) {
            if (cb) {
                cb(_user);
            }
            logger.success(translate('X_HAS_BEEN_UPDATED', _user.email));
        }, function(res) {
            if (res.data.validationErrors) {
                $scope.validationErrors = res.data.validationErrors;
            }
        });
    }
    function deleteUser(user, cb) {
        user.$delete(function(_user) {
            if (cb) {
                cb(_user);
            }
            logger.success(translate('X_HAS_BEEN_DELETED', _user.email));
        });
    }
    function getGroups(query, cb) {
        groupAPI.query(query, function(_groups) {
            if (cb) {
                cb(_groups);
            }
        });
    }
    function getProfile(cb) {
        userAPI.getProfile(function(_profile) {
            if (cb) {
                cb(_profile);
            }
        }, function(res) {
            $state.go('home');
        });
    }
    function updateProfile(profile, cb) {
        userAPI.updateProfile(profile, function(_profile) {
            if (cb) {
                cb(_profile);
            }
            logger.success(translate('X_HAS_BEEN_UPDATED', _profile.email));
        }, function(res) {
            if (res.data.validationErrors) {
                $scope.validationErrors = res.data.validationErrors;
            }
        });
    }
}