'use strict';

angular.module(window.APP.modules.main)

.service('groupAPI', ['$rootScope', '$resource',
    function($rootScope, $resource) {
        var api = $resource('/api/group/:_id', {
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
            }
        });
        
        api.prototype.isEqualTo = function(group) {
            return this._id === (group._id || group);
        };
        api.prototype.canCreate = api.canCreate = function() {
            // check permissions
            if (!$rootScope.AUTH.isAllowed({
                allows: {
                    group: ['post']
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
                    group: ['put']
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
            // check this is my group
            if (this.isEqualTo($rootScope.USER.group)) {
                return false;
            }
            // check permissions
            if (!$rootScope.AUTH.isAllowed({
                allows: {
                    group: ['delete']
                }
            })) {
                return false;
            }
            return true;
        };

        return api;
    }
]);