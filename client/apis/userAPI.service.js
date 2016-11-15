'use strict';

angular
    .module(window.APP.modules.main)
    .service('userAPI', userAPI);
userAPI.$inject = ['$resource', 'user', 'auth'];
function userAPI($resource, user, auth) {
        var api = init();

        api.canCreate = canCreate;
        api.prototype.isMe = isMe;
        api.prototype.canCreate = canCreate;
        api.prototype.canEdit = canEdit;
        api.prototype.canDelete = canDelete;

        return api;

        // functions
        function init() {
            return $resource('/api/:path/:_id', {
                path: 'user',
                _id: '@_id'
            }, {
                update: {
                    method: 'PUT'
                },
                count: {
                    method: 'GET',
                    params: {
                        _id: 'count'
                    }
                },
                getProfile: {
                    method: 'GET',
                    params: {
                        path: 'profile',
                        _id: undefined
                    }
                },
                updateProfile: {
                    method: 'PUT',
                    params: {
                        path: 'profile',
                        _id: undefined
                    }
                },
                changePassword: {
                    method: 'PUT',
                    params: {
                        path: 'profile',
                        _id: 'changePassword'
                    }
                }
            });
        }
        function isMe(user) {
            return this._id === (user._id || user);
        }
        function canCreate() {
            // check permissions
            if (!auth.isAllowed({
                allows: {
                    user: ['post']
                }
            })) {
                return false;
            }
            return true;
        }
        function canEdit() {
            // check protected
            if (this.isProtected) {
                return false;
            }
            // check permissions
            if (!auth.isAllowed({
                allows: {
                    user: ['put']
                }
            })) {
                return false;
            }
            return true;
        }
        function canDelete() {
            // check protected
            if (this.isProtected) {
                return false;
            }
            // check this is me
            if (this.isMe(user)) {
                return false;
            }
            // check permissions
            if (!auth.isAllowed({
                allows: {
                    user: ['delete']
                }
            })) {
                return false;
            }
            return true;
        }
    }