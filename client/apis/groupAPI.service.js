'use strict';

angular
    .module(window.APP.modules.main)
    .service('groupAPI', groupAPI);

groupAPI.$inject = ['$rootScope', '$resource'];
function groupAPI($rootScope, $resource) {
    var api = init();
    
    api.canCreate = canCreate;
    api.prototype.isEqualTo = isEqualTo;
    api.prototype.canCreate = canCreate;
    api.prototype.canEdit = canEdit;
    api.prototype.canDelete = canDelete;
    
    return api;
    
    // functions
    function init() {
        return $resource('/api/group/:_id', {
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
    }
    function isEqualTo(group) {
        return this._id === (group._id || group);
    }
    function canCreate() {
        // check permissions
        if (!$rootScope.AUTH.isAllowed({
            allows: {
                group: ['post']
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
        if (!$rootScope.AUTH.isAllowed({
            allows: {
                group: ['put']
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
    }
}