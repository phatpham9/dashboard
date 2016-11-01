'use strict';

angular
    .module(window.APP.modules.main)
    .service('settingAPI', ['$rootScope', '$resource',
        function($rootScope, $resource) {
            var api = init();

            api.canCreate = canCreate;
            api.prototype.canCreate = canCreate;
            api.prototype.canEdit = canEdit;
            api.prototype.canDelete = canDelete;

            return api;

            // functions
            function init() {
                return $resource('/api/setting/:_id', {
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
            function canCreate() {
                // check permissions
                if (!$rootScope.AUTH.isAllowed({
                    allows: {
                        setting: ['post']
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
                        setting: ['put']
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
                // check permissions
                if (!$rootScope.AUTH.isAllowed({
                    allows: {
                        setting: ['delete']
                    }
                })) {
                    return false;
                }
                return true;
            }
        }
    ]);