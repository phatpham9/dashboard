'use strict';

angular.module(window.APP.modules.main)

.service('settingAPI', ['$rootScope', '$resource',
    function($rootScope, $resource) {
        var api = $resource('/api/setting/:_id', {
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

        api.prototype.canCreate = api.canCreate = function() {
            // check permissions
            if (!$rootScope.AUTH.isAllowed({
                allows: {
                    setting: ['post']
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
                    setting: ['put']
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
            // check permissions
            if (!$rootScope.AUTH.isAllowed({
                allows: {
                    setting: ['delete']
                }
            })) {
                return false;
            }
            return true;
        };

        return api;
    }
]);