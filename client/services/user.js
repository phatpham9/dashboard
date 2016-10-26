'use strict';

angular.module(window.APP.modules.main)

.service('user', ['APP', '$rootScope', '$cookieStore',
    function(APP, $rootScope, $cookieStore) {
        var self;
        var user = function() {
            self = this;
            self.init();
        };

        user.prototype = {
            init: function() {
                if ($cookieStore.get(APP.cookieId)) {
                    var _user = $cookieStore.get(APP.cookieId);
                    self._id = _user._id;
                    self.email = _user.email;
                    self.group = _user.group;
                    self.permissions = _user.group.permissions;
                }
            },
            isLoggedin: function() {
                return self._id ? true : false;
            },
            login: function(_user) {
                self._id = _user._id;
                self.email = _user.email;
                self.group = _user.group;
                self.permissions = _user.group.permissions;
                $cookieStore.put(APP.cookieId, _user);
            },
            logout: function() {
                delete self._id;
                delete self.email;
                delete self.group;
                delete self.permissions;
                $cookieStore.remove(APP.cookieId);
            },
            isMe: function(userId) {
                return self._id === userId;
            }
        };

        return user;
    }
]);