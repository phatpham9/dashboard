'use strict';

angular
    .module(window.APP.modules.user)
    .controller('users', usersController);

usersController.$inject = ['$scope', '$state', '$stateParams', 'translate', 'logger', 'userAPI'];
function usersController($scope, $state, $stateParams, translate, logger, userAPI) {
    $scope.query = {
        query: undefined,
        sort: 'email',
        page: 1,
        limit: 25
    };
    $scope.count = {
        users: 0
    };
    $scope.search = searchUsers;
    $scope.canCreate = canCreate;
    $scope.delete = deleteFunc;
    searchUsers();

    // functions
    function canCreate() {
        return userAPI.canCreate();
    }
    function deleteFunc(user) {
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
    }

    function searchUsers(sortBy) {
        if (sortBy) {
            $scope.query.sort = sortBy;
        }
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
            logger.success(translate('X_HAS_BEEN_DELETED', user.email));
        });
    }
}