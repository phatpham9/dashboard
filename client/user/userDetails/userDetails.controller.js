'use strict';

angular
    .module(window.APP.modules.user)
    .controller('userDetails', ['$scope', '$state', '$stateParams', '$modal', 'translate', 'logger', 'userAPI', 'groupAPI',
        function($scope, $state, $stateParams, $modal, translate, logger, userAPI, groupAPI) {
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
                    }, function(user) {
                        $scope.user = user;

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
                    getProfile(function(user) {
                        $scope.user = user;
                    });
                }
            }
            function save() {
                if ($scope.form.$valid) {
                    if ($scope.state === 'create') {
                        if ($scope.user.canCreate()) {
                            createUser($scope.user, function(user) {
                                $scope.form.$setPristine();
                                $state.go('userDetails', {userId: user._id});
                            });
                        }
                    } else if ($scope.state === 'details') {
                        if ($scope.user.canEdit()) {
                            updateUser($scope.user, function(user) {
                                $scope.form.$setPristine();
                                $scope.user = user;
                            });
                        }
                    } else {
                        updateProfile($scope.user, function(user) {
                            $scope.form.$setPristine();
                            $scope.user = user;
                            // update current logged in user info
                            $scope.USER.login($scope.user);
                        });
                    }
                }
            }
            function deleteFunc() {
                if ($scope.user.canDelete()) {
                    if (confirm(translate('CONFIRM_DELETE_X', $scope.user.email))) {
                        deleteUser($scope.user, function(user) {
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
                userAPI.get(query, function(user) {
                    if (cb) {
                        cb(user);
                    }
                }, function(res) {
                    $state.go('users');
                });
            }
            function createUser(user, cb) {
                user.$save(function(user) {
                    if (cb) {
                        cb(user);
                    }
                    logger.success(translate('X_HAS_BEEN_CREATED', user.email));
                }, function(res) {
                    if (res.data.validationErrors) {
                        $scope.validationErrors = res.data.validationErrors;
                    }
                });
            }
            function updateUser(user, cb) {
                user.$update(function(user) {
                    if (cb) {
                        cb(user);
                    }
                    logger.success(translate('X_HAS_BEEN_UPDATED', user.email));
                }, function(res) {
                    if (res.data.validationErrors) {
                        $scope.validationErrors = res.data.validationErrors;
                    }
                });
            }
            function deleteUser(user, cb) {
                user.$delete(function(user) {
                    if (cb) {
                        cb(user);
                    }
                    logger.success(translate('X_HAS_BEEN_DELETED', user.email));
                });
            }
            function getGroups(query, cb) {
                groupAPI.query(query, function(groups) {
                    if (cb) {
                        cb(groups);
                    }
                });
            }
            function getProfile(cb) {
                userAPI.getProfile(function(user) {
                    if (cb) {
                        cb(user);
                    }
                }, function(res) {
                    $state.go('home');
                });
            }
            function updateProfile(user, cb) {
                userAPI.updateProfile(user, function(user) {
                    if (cb) {
                        cb(user);
                    }
                    logger.success(translate('X_HAS_BEEN_UPDATED', user.email));
                }, function(res) {
                    if (res.data.validationErrors) {
                        $scope.validationErrors = res.data.validationErrors;
                    }
                });
            }
        }
    ]);