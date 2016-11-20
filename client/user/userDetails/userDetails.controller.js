'use strict';

angular
    .module(window.APP.modules.user)
    .controller('userDetails', userDetailsController);

userDetailsController.$inject = ['$state', '$stateParams', '$modal', 'translate', 'logger', 'userAPI', 'groupAPI'];
function userDetailsController($state, $stateParams, $modal, translate, logger, userAPI, groupAPI) {
    var vm = this;

    vm.validationErrors = {
        email: undefined,
        password: undefined
    };
    vm.state = undefined;
    vm.user = {};
    vm.groups = [];
    vm.save = save;
    vm.changePassword = changePassword;
    vm.delete = deleteFunc;
    init();

    // functions
    function init() {
        if ($state.current.name === 'userCreate') {
            vm.state = 'create';
            vm.user = new userAPI({
                email: undefined,
                password: undefined
            });

            getGroups({
                limit: 0,
                page: 0,
                sort: 'name'
            }, function(groups) {
                vm.groups = groups;
            });
        } else if ($state.current.name === 'userDetails') {
            vm.state = 'details';
            getUser({
                _id: $stateParams.userId
            }, function(_user) {
                vm.user = _user;

                getGroups({
                    limit: 0,
                    page: 0,
                    sort: 'name'
                }, function(groups) {
                    vm.groups = groups;
                });
            });
        } else {
            vm.state = 'profile';
            getProfile(function(_user) {
                vm.user = _user;
            });
        }
    }
    function save(form) {
        if (form.$valid) {
            if (vm.state === 'create') {
                if (vm.user.canCreate()) {
                    createUser(vm.user, function(_user) {
                        form.$setPristine();
                        $state.go('userDetails', {userId: _user._id});
                    });
                }
            } else if (vm.state === 'details') {
                if (vm.user.canEdit()) {
                    updateUser(vm.user, function(_user) {
                        form.$setPristine();
                        vm.user = _user;
                    });
                }
            } else {
                updateProfile(vm.user, function(_user) {
                    form.$setPristine();
                    vm.user = _user;
                    // update current logged in user info
                    user.login(vm.user);
                });
            }
        }
    }
    function deleteFunc(form) {
        if (vm.user.canDelete()) {
            if (confirm(translate('CONFIRM_DELETE_X', vm.user.email))) {
                deleteUser(vm.user, function(_user) {
                    form.$setPristine();
                    $state.go('users');
                });
            }
        }
    }
    function changePassword() {
        if (vm.state === 'profile') {
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
                        return vm.user._id;
                    }
                },
                controller: 'changePasswordModal',
                controllerAs: 'vm'
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
                vm.validationErrors = res.data.validationErrors;
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
                vm.validationErrors = res.data.validationErrors;
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
                vm.validationErrors = res.data.validationErrors;
            }
        });
    }
}