'use strict';

angular.module(window.APP.modules.group)

.controller('groups', ['$scope', '$state', '$stateParams', 'translate', 'alertify', 'groupAPI',
    function($scope, $state, $stateParams, translate, alertify, groupAPI) {
        $scope.query = {
            query: undefined,
            sort: 'name',
            page: 1,
            limit: 25
        };
        $scope.count = {
            groups: 0
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
            return groupAPI.canCreate();
        };
        $scope.delete = function(group) {
            if (group && group.canDelete()) {
                if (confirm(translate('CONFIRM_DELETE_X', group.name))) {
                    deleteGroup(group, function(group) {
                        $scope.groups.forEach(function(obj, i) {
                            if (obj._id === group._id) {
                                $scope.groups.splice(i, 1);
                            }
                        });
                    });
                }
            }
        };
        // private functions
        function search() {
            getGroups($scope.query, function(groups) {
                $scope.groups = groups;
                countGroups($scope.query, function(total) {
                    $scope.count.groups = total;
                });
            });
        }
        function getGroups(query, cb) {
            groupAPI.query(query, function(groups) {
                if (cb) {
                    cb(groups);
                }
            });
        }
        function countGroups(query, cb) {
            groupAPI.count(query, function(res) {
                if (cb) {
                    cb(res.total);
                }
            });
        }
        function deleteGroup(group, cb) {
            group.$delete(function(group) {
                if (cb) {
                    cb(group);
                }
                alertify.success(translate('X_HAS_BEEN_DELETED', group.name));
            }, function(res) {
                if (res.data.validationErrors && res.data.validationErrors.message) {
                    alertify.alert(translate(res.data.validationErrors.message));
                }
            });
        }
    }
])

.controller('groupDetails', ['$scope', '$state', '$stateParams', 'translate', 'alertify', 'groupAPI', 'userAPI', 'settingAPI',
    function($scope, $state, $stateParams, translate, alertify, groupAPI, userAPI, settingAPI) {
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
        $scope.validationErrors = {
            name: undefined
        };

        // public functions
        $scope.save = function() {
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
        };
        $scope.delete = function() {
            if ($scope.group.canDelete()) {
                if (confirm(translate('CONFIRM_DELETE_X', $scope.group.name))) {
                    deleteGroup($scope.group, function(group) {
                        $scope.form.$setPristine();
                        $state.go('groups');
                    });
                }
            }
        };
        // private functions
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
                alertify.success(translate('X_HAS_BEEN_CREATED', group.name));
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
                alertify.success(translate('X_HAS_BEEN_UPDATED', group.name));
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
                alertify.success(translate('X_HAS_BEEN_DELETED', group.name));
            }, function(res) {
                if (res.data.validationErrors && res.data.validationErrors.message) {
                    alertify.alert(translate(res.data.validationErrors.message));
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
]);