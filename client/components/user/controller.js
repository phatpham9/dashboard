'use strict';

angular.module(window.APP.modules.user)

.controller('users', ['$scope', '$state', '$stateParams', 'translate', 'alertify', 'userAPI',
    function($scope, $state, $stateParams, translate, alertify, userAPI) {
        $scope.query = {
            query: undefined,
            sort: 'email',
            page: 1,
            limit: 25
        };
        $scope.count = {
            users: 0
        };
        search();

        // public functions
        $scope.search = function(sortBy) {
            if (sortBy) {
                $scope.query.sort = sortBy;
            }
            search();
        };
        $scope.canCreate = function() {
            return userAPI.canCreate();
        };
        $scope.delete = function(user) {
            if (user && user.canDelete()) {
                if (confirm(translate('CONFIRM_DELETE_X', user.email))) {
                    deleteUser(user, function(user) {
                        $scope.users.forEach(function(obj, i) {
                            if (obj._id === user._id) {
                                $scope.users.splice(i, 1);
                            }
                        });
                    });
                }
            }
        };
        // private functions
        function search() {
            getUsers($scope.query, function(users) {
                $scope.users = users;
                countUsers($scope.query, function(total) {
                    $scope.count.users = total;
                });
            });
        }
        function getUsers(query, cb) {
            userAPI.query(query, function(users) {
                if (cb) {
                    cb(users);
                }
            });
        }
        function countUsers(query, cb) {
            userAPI.count(query, function(res) {
                if (cb) {
                    cb(res.total);
                }
            });
        }
        function deleteUser(user, cb) {
            user.$delete(function(user) {
                if (cb) {
                    cb(user);
                }
                alertify.success(translate('X_HAS_BEEN_DELETED', user.email));
            });
        }
    }
])

.controller('userDetails', ['$scope', '$state', '$stateParams', '$modal', 'translate', 'alertify', 'userAPI', 'groupAPI',
    function($scope, $state, $stateParams, $modal, translate, alertify, userAPI, groupAPI) {
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
        $scope.validationErrors = {
            email: undefined,
            password: undefined
        };

        // public functions
        $scope.save = function() {
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
        };
        $scope.changePassword = function() {
            if ($scope.state === 'profile') {
                var modalInstance = $modal.open({
                    backdrop: 'static',
                    templateUrl: '/components/user/views/changePasswordModal.html',
                    resolve: {
                        resources: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                '/apis/user.js'
                            ]);
                        }],
                        userId: function() {
                            return $scope.user._id;
                        }
                    },
                    controller: ['$scope', '$modalInstance', 'alertify', 'userAPI', 'userId',
                        function($scope, $modalInstance, alertify, userAPI, userId) {
                            $scope.user = {
                                _id: userId,
                                password: null,
                                confirmPassword: null
                            };
                            $scope.validationErrors = {
                                password: null,
                                confirmPassword: null
                            };

                            // public functions
                            $scope.save = function(valid) {
                                if (valid) {
                                    changePassword($scope.user, function(res) {
                                        $modalInstance.close();
                                    });
                                }
                            };
                            $scope.cancel = function() {
                                $modalInstance.dismiss('cancel');
                            };

                            // private functions
                            function changePassword(user, cb) {
                                userAPI.changePassword(user, function(res) {
                                    if (cb) {
                                        cb(res);
                                    }
                                    alertify.success(translate('X_HAS_BEEN_UPDATED', translate('NEW_PASSWORD')));
                                }, function(res) {
                                    if (res.data.validationErrors) {
                                        $scope.validationErrors = res.data.validationErrors;
                                    }
                                });
                            }
                        }
                    ]
                });
            }
        };
        $scope.delete = function() {
            if ($scope.user.canDelete()) {
                if (confirm(translate('CONFIRM_DELETE_X', $scope.user.email))) {
                    deleteUser($scope.user, function(user) {
                        $scope.form.$setPristine();
                        $state.go('users');
                    });
                }
            }
        };
        // private functions
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
                alertify.success(translate('X_HAS_BEEN_CREATED', user.email));
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
                alertify.success(translate('X_HAS_BEEN_UPDATED', user.email));
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
                alertify.success(translate('X_HAS_BEEN_DELETED', user.email));
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
                alertify.success(translate('X_HAS_BEEN_UPDATED', user.email));
            }, function(res) {
                if (res.data.validationErrors) {
                    $scope.validationErrors = res.data.validationErrors;
                }
            });
        }
    }
]);