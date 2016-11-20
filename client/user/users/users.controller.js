'use strict';

angular
    .module(window.APP.modules.user)
    .controller('users', usersController);

usersController.$inject = ['$state', '$stateParams', 'translate', 'logger', 'userAPI'];
function usersController($state, $stateParams, translate, logger, userAPI) {
    var vm = this;

    vm.query = {
        query: undefined,
        sort: 'email',
        page: 1,
        limit: 25
    };
    vm.users = [];
    vm.count = {
        users: 0
    };
    vm.search = searchUsers;
    vm.canCreate = canCreate;
    vm.delete = deleteFunc;
    searchUsers();

    // functions
    function canCreate() {
        return userAPI.canCreate();
    }
    function deleteFunc(user) {
        if (user && user.canDelete()) {
            if (confirm(translate('CONFIRM_DELETE_X', user.email))) {
                deleteUser(user, function(user) {
                    vm.users.forEach(function(obj, i) {
                        if (obj._id === user._id) {
                            vm.users.splice(i, 1);
                        }
                    });
                });
            }
        }
    }

    function searchUsers(sortBy) {
        if (sortBy) {
            vm.query.sort = sortBy;
        }
        getUsers(vm.query, function(users) {
            vm.users = users;
            countUsers(vm.query, function(total) {
                vm.count.users = total;
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