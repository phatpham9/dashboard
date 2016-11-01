'use strict';

angular
    .module(window.APP.modules.group)
    .controller('groupDetails', groupDetailsController);

groupDetailsController.$inject = ['$scope', '$state', '$stateParams', 'translate', 'logger', 'groupAPI', 'userAPI', 'settingAPI'];
function groupDetailsController($scope, $state, $stateParams, translate, logger, groupAPI, userAPI, settingAPI) {
    $scope.validationErrors = {
        name: undefined
    };
    $scope.save = save;
    $scope.delete = deleteFunc;
    init();

    // functions
    function init() {
        if ($state.current.name === 'groupCreate') {
            $scope.state = 'create';
            $scope.group = new groupAPI({
                name: undefined
            });
        } else {
            $scope.state = 'details';
            getGroup({
                _id: $stateParams.groupId
            }, function(group) {
                $scope.group = group;

                // get group's users
                getUsers({
                    limit: 0,
                    page: 0,
                    sort: 'email',
                    filter: {
                        group: $scope.group._id
                    }
                }, function(users) {
                    $scope.users = users;
                });
            });
        }
        getSetting({
            _id: 'DEFAULT_PERMISSIONS'
        }, function(setting) {
            $scope.permissions = [];
            Object.keys(setting.value).forEach(function(resource) {
                $scope.permissions.push({
                    resource: resource,
                    permissions: setting.value[resource]
                });
            });
        });
    }
    function save() {
        if ($scope.form.$valid) {
            if ($scope.state === 'create') {
                if ($scope.group.canCreate()) {
                    createGroup($scope.group, function(group) {
                        $scope.form.$setPristine();
                        $state.go('groupDetails', {groupId: group._id});
                    });
                }
            } else {
                if ($scope.group.canEdit()) {
                    updateGroup($scope.group, function(group) {
                        $scope.form.$setPristine();
                        $scope.group = group;
                    });
                }
            }
        }
    }
    function deleteFunc() {
        if ($scope.group.canDelete()) {
            if (confirm(translate('CONFIRM_DELETE_X', $scope.group.name))) {
                deleteGroup($scope.group, function(group) {
                    $scope.form.$setPristine();
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
                $scope.validationErrors = res.data.validationErrors;
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
                $scope.validationErrors = res.data.validationErrors;
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