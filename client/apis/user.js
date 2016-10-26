'use strict';

angular.module(window.APP.modules.main)

.service('userAPI', ['$rootScope', '$resource',
    function($rootScope, $resource) {
        var api = $resource('/api/:path/:_id', {
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

        api.prototype.isMe = function(user) {
            return this._id === (user._id || user);
        };
        api.prototype.canCreate = api.canCreate = function() {
            // check permissions
            if (!$rootScope.AUTH.isAllowed({
                allows: {
                    user: ['post']
                }
            })) {
                return false;
            }
            return true;
        };
        api.prototype.canEdit = function() {
            // check protected
            if (this.isProtected) {
                return false;
            }
            // check permissions
            if (!$rootScope.AUTH.isAllowed({
                allows: {
                    user: ['put']
                }
            })) {
                return false;
            }
            return true;
        };
        api.prototype.canDelete = function() {
            // check protected
            if (this.isProtected) {
                return false;
            }
            // check this is me
            if (this.isMe($rootScope.USER)) {
                return false;
            }
            // check permissions
            if (!$rootScope.AUTH.isAllowed({
                allows: {
                    user: ['delete']
                }
            })) {
                return false;
            }
            return true;
        };

        return api;
    }
]);