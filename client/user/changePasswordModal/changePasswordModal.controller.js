'use strict';

angular
    .module(window.APP.modules.user)
    .controller('changePasswordModal', changePasswordModalController);

changePasswordModalController.$inject = ['$modalInstance', 'translate', 'logger', 'userAPI', 'userId'];
function changePasswordModalController($modalInstance, translate, logger, userAPI, userId) {
    var vm = this;

    vm.user = {
        _id: userId,
        password: undefined,
        confirmPassword: undefined
    };
    vm.validationErrors = {
        password: undefined,
        confirmPassword: undefined
    };
    vm.save = save;
    vm.cancel = cancel;

    // functions
    function save(form) {
        if (form.$valid) {
            changePassword(vm.user, function(res) {
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
                vm.validationErrors = res.data.validationErrors;
            }
        });
    }
}