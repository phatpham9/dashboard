'use strict';

angular
    .module(window.APP.modules.group)
    .controller('groups', groupsController);

groupsController.$inject = ['$scope', '$state', '$stateParams', 'translate', 'logger', 'groupAPI'];
function groupsController($scope, $state, $stateParams, translate, logger, groupAPI) {
    $scope.query = {
        query: undefined,
        sort: 'name',
        page: 1,
        limit: 25
    };
    $scope.count = {
        groups: 0
    };
    $scope.search = searchGroups;
    $scope.canCreate = canCreate;
    $scope.delete = deleteFunc;
    searchGroups();

    // functions
    function canCreate() {
        return groupAPI.canCreate();
    }
    function deleteFunc(group) {
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
    }
    
    function searchGroups(sortBy) {
        if (sortBy) {
            $scope.query.sort = sortBy;
        }
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
            logger.success(translate('X_HAS_BEEN_DELETED', group.name));
        }, function(res) {
            if (res.data.validationErrors && res.data.validationErrors.message) {
                logger.alert(translate(res.data.validationErrors.message));
            }
        });
    }
}