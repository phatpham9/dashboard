'use strict';

angular
    .module(window.APP.modules.main)
    .service('user', ['APP', '$rootScope', '$cookieStore',
        function(APP, $rootScope, $cookieStore) {
            var self;
            var service = function() {
                self = this;
                self.init();
            };

            service.prototype.init = init;
            service.prototype.isLoggedin = isLoggedin;
            service.prototype.login = login;
            service.prototype.logout = logout;
            service.prototype.isMe = isMe;

            return service;

            // functions
            function init() {
                if ($cookieStore.get(APP.cookieId)) {
                    var _user = $cookieStore.get(APP.cookieId);
                    self._id = _user._id;
                    self.email = _user.email;
                    self.group = _user.group;
                    self.permissions = _user.group ? _user.group.permissions : {};
                }
            }
            function isLoggedin() {
                return self._id ? true : false;
            }
            function login(_user) {
                self._id = _user._id;
                self.email = _user.email;
                self.group = _user.group;
                self.permissions = _user.group ? _user.group.permissions : {};
                $cookieStore.put(APP.cookieId, _user);
            }
            function logout() {
                delete self._id;
                delete self.email;
                delete self.group;
                delete self.permissions;
                $cookieStore.remove(APP.cookieId);
            }
            function isMe(userId) {
                return self._id === userId;
            }
        }
    ]);