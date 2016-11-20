'use strict';

angular
    .module(window.APP.modules.group)
    .controller('groupDetails', groupDetailsController);

groupDetailsController.$inject = ['$state', '$stateParams', 'translate', 'logger', 'groupAPI', 'userAPI', 'settingAPI'];
function groupDetailsController($state, $stateParams, translate, logger, groupAPI, userAPI, settingAPI) {
    var vm = this;

    vm.state = undefined;
    vm.group = {};
    vm.users = [];
    vm.permissions = [];
    vm.validationErrors = {
        name: undefined
    };
    vm.save = save;
    vm.delete = deleteFunc;
    init();

    // functions
    function init() {
        if ($state.current.name === 'groupCreate') {
            vm.state = 'create';
            vm.group = new groupAPI({
                name: undefined
            });
        } else {
            vm.state = 'details';
            getGroup({
                _id: $stateParams.groupId
            }, function(group) {
                vm.group = group;

                // get group's users
                getUsers({
                    limit: 0,
                    page: 0,
                    sort: 'email',
                    filter: {
                        group: vm.group._id
                    }
                }, function(users) {
                    vm.users = users;
                });
            });
        }
        getSetting({
            _id: 'DEFAULT_PERMISSIONS'
        }, function(setting) {
            vm.permissions = [];
            Object.keys(setting.value).forEach(function(resource) {
                vm.permissions.push({
                    resource: resource,
                    permissions: setting.value[resource]
                });
            });
        });
    }
    function save() {
        if (vm.form.$valid) {
            if (vm.state === 'create') {
                if (vm.group.canCreate()) {
                    createGroup(vm.group, function(group) {
                        vm.form.$setPristine();
                        $state.go('groupDetails', {groupId: group._id});
                    });
                }
            } else {
                if (vm.group.canEdit()) {
                    updateGroup(vm.group, function(group) {
                        vm.form.$setPristine();
                        vm.group = group;
                    });
                }
            }
        }
    }
    function deleteFunc() {
        if (vm.group.canDelete()) {
            if (confirm(translate('CONFIRM_DELETE_X', vm.group.name))) {
                deleteGroup(vm.group, function(group) {
                    vm.form.$setPristine();
                    $state.go('groups');
                });
            }
        }
    }

    function getGroup(query, cb) {
        groupAPI.get(query, function(group) {
            if (cb) {
                cb(group);
            }
        }, function(res) {
            $state.go('groups');
        });
    }
    function createGroup(group, cb) {
        group.$save(function(group) {
            if (cb) {
                cb(group);
            }
            logger.success(translate('X_HAS_BEEN_CREATED', group.name));
        }, function(res) {
            if (res.data.validationErrors) {
                vm.validationErrors = res.data.validationErrors;
            }
        });
    }
    function updateGroup(group, cb) {
        group.$update(function(group) {
            if (cb) {
                cb(group);
            }
            logger.success(translate('X_HAS_BEEN_UPDATED', group.name));
        }, function(res) {
            if (res.data.validationErrors) {
                vm.validationErrors = res.data.validationErrors;
            }
        });
    }
    function deleteGroup(group, cb) {
        group.$delete(function(group) {
            if (cb) {
                cb(group);
            }
            logger.success(translate('X_HAS_BEEN_DELETED', group.name));
        }, function(res) {
            if (res.data.validationErrors && res.data.validationErrors.message) {
                logger.alert(translate(res.data.validationErrors.message));
            }
        });
    }
    function getUsers(query, cb) {
        userAPI.query(query, function(users) {
            if (cb) {
                cb(users);
            }
        });
    }
    function getSetting(query, cb) {
        settingAPI.get(query, function(setting) {
            if (cb) {
                cb(setting);
            }
        });
    }
}