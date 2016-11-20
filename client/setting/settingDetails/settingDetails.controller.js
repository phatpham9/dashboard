'use strict';

angular
    .module(window.APP.modules.setting)
    .controller('settingDetails', settingDetails);

settingDetails.$inject = ['$state', '$stateParams', '$modal', '$filter', 'translate', 'logger', 'settingAPI'];
function settingDetails($state, $stateParams, $modal, $filter, translate, logger, settingAPI) {
    var vm = this;

    vm.state = undefined;
    vm.setting = {};
    vm.selectedType = undefined;
    vm.tmpValue = undefined;
    vm.validationErrors = {
        key: undefined,
        value: undefined
    };
    vm.save = save;
    vm.delete = deleteFunc;
    init();

    // functions
    function init() {
        if ($state.current.name === 'settingCreate') {
            vm.state = 'create';
            vm.setting = new settingAPI({
                key: undefined,
                value: undefined
            });

            vm.selectedType = 'text';
            vm.tmpValue = undefined;
        } else {
            vm.state = 'details';
            getSetting({
                _id: $stateParams.settingId
            }, function(setting) {
                vm.setting = setting;

                // parse value after getting
                if (typeof vm.setting.value === 'object') {
                    vm.selectedType = 'JSON';
                    vm.tmpValue = $filter('json')(vm.setting.value, 8);
                } else if (typeof vm.setting.value === 'number') {
                    vm.selectedType = 'number';
                    vm.tmpValue = vm.setting.value;
                } else {
                    vm.selectedType = 'text';
                    vm.tmpValue = String(vm.setting.value);
                }
            });
        }
    }
    function save(form) {
        if (form.$valid) {
            // parse value before saving
            if (vm.selectedType === 'JSON') {
                try {
                    vm.setting.value = JSON.parse(vm.tmpValue);
                } catch(err) {
                    logger.alert(translate('INVALID_DATA_TYPE'));
                    return;
                }
            } else if (vm.selectedType === 'number') {
                var result = Number(vm.tmpValue);
                if (isNaN(result)) {
                    logger.alert(translate('INVALID_DATA_TYPE'));
                    return;
                }
                vm.setting.value = result;
            } else {
                vm.setting.value = String(vm.tmpValue);
            }

            if (vm.state === 'create') {
                if (vm.setting.canCreate()) {
                    createSetting(vm.setting, function(setting) {
                        form.$setPristine();
                        $state.go('settingDetails', {settingId: setting._id});
                    });
                }
            } else {
                if (vm.setting.canEdit()) {
                    updateSetting(vm.setting, function(setting) {
                        form.$setPristine();
                        vm.setting = setting;

                        // parse value after saving
                        if (typeof vm.setting.value === 'object') {
                            vm.selectedType = 'JSON';
                            vm.tmpValue = $filter('json')(vm.setting.value, 8);
                        } else if (typeof vm.setting.value === 'number') {
                            vm.selectedType = 'number';
                            vm.tmpValue = vm.setting.value;
                        } else {
                            vm.selectedType = 'text';
                            vm.tmpValue = String(vm.setting.value);
                        }
                    });
                }
            }
        }
    }
    function deleteFunc(form) {
        if (vm.setting.canDelete()) {
            if (confirm(translate('CONFIRM_DELETE_X', vm.setting.key))) {
                deleteSetting(vm.setting, function(setting) {
                    form.$setPristine();
                    $state.go('settings');
                });
            }
        }
    }

    function getSetting(query, cb) {
        settingAPI.get(query, function(setting) {
            if (cb) {
                cb(setting);
            }
        }, function(res) {
            $state.go('settings');
        });
    }
    function createSetting(setting, cb) {
        setting.$save(function(setting) {
            if (cb) {
                cb(setting);
            }
            logger.success(translate('X_HAS_BEEN_CREATED', setting.key));
        }, function(res) {
            if (res.data.validationErrors) {
                vm.validationErrors = res.data.validationErrors;
            }
        });
    }
    function updateSetting(setting, cb) {
        setting.$update(function(setting) {
            if (cb) {
                cb(setting);
            }
            logger.success(translate('X_HAS_BEEN_UPDATED', setting.key));
        }, function(res) {
            if (res.data.validationErrors) {
                vm.validationErrors = res.data.validationErrors;
            }
        });
    }
    function deleteSetting(setting, cb) {
        setting.$delete(function(setting) {
            if (cb) {
                cb(setting);
            }
            logger.success(translate('X_HAS_BEEN_DELETED', setting.key));
        });
    }
}