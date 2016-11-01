'use strict';

angular
    .module(window.APP.modules.user)
    .controller('changePasswordModal', ['$scope', '$modalInstance', 'translate', 'logger', 'userAPI', 'userId',
        function($scope, $modalInstance, translate, logger, userAPI, userId) {
            $scope.user = {
                _id: userId,
                password: undefined,
                confirmPassword: undefined
            };
            $scope.validationErrors = {
                password: undefined,
                confirmPassword: undefined
            };
            $scope.save = save;
            $scope.cancel = cancel;

            // functions
            function save(valid) {
                if (valid) {
                    changePassword($scope.user, function(res) {
                        $modalInstance.close();
                    });
                }
            }
            function cancel() {
                $modalInstance.dismiss('cancel');
            }
            function changePassword(user, cb) {
                userAPI.changePassword(user, function(res) {
                    if (cb) {
                        cb(res);
                    }
                    logger.success(translate('X_HAS_BEEN_UPDATED', translate('NEW_PASSWORD')));
                }, function(res) {
                    if (res.data.validationErrors) {
                        $scope.validationErrors = res.data.validationErrors;
                    }
                });
            }
        }
    ]);