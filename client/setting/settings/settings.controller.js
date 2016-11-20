'use strict';

angular
    .module(window.APP.modules.setting)
    .controller('settings', settingsController);

settingsController.$inject = ['$state', 'translate', 'logger', 'settingAPI'];
function settingsController($state, translate, logger, settingAPI) {
    var vm = this;

    vm.query = {
        query: undefined,
        sort: 'key',
        page: 1,
        limit: 25
    };
    vm.settings = [];
    vm.count = {
        settings: 0
    };
    vm.displayDataType = displayDataType;
    vm.displayValue = displayValue;
    vm.search = searchSettings;
    vm.canCreate = canCreate;
    vm.delete = deleteFunc;
    searchSettings();

    // functions
    function canCreate() {
        return settingAPI.canCreate();
    }
    function displayDataType(value) {
        switch(typeof value) {
            case 'object':
                return 'JSON';
            case 'number':
                return 'number';
            default:
                return 'text';
        }
    }
    function displayValue(value) {
        var result;
        switch(typeof value) {
            case 'object':
                result = JSON.stringify(value);
                break;
            case 'number':
                result = value;
                break;
            default:
                result = String(value);
                break;
        }
        if (typeof value !== 'number' && result.length > 100) {
            return result.substring(100) + '...';
        }
        return result;
    }
    function deleteFunc(setting) {
        if (setting && setting.canDelete()) {
            if (confirm(translate('CONFIRM_DELETE_X', setting.key))) {
                deleteSetting(setting, function(setting) {
                    vm.settings.forEach(function(obj, index) {
                        if (obj._id === setting._id) {
                            vm.settings.splice(index, 1);
                        }
                    });
                });
            }
        }
    }

    function searchSettings(sortBy) {
        if (sortBy) {
            vm.query.sort = sortBy;
        }
        getSettings(vm.query, function(settings) {
            vm.settings = settings;
            countSettings(vm.query, function(total) {
                vm.count.settings = total;
            });
        });
    }
    function getSettings(query, cb) {
        settingAPI.query(query, function(settings) {
            if (cb) {
                cb(settings);
            }
        });
    }
    function countSettings(query, cb) {
        settingAPI.count(query, function(res) {
            if (cb) {
                cb(res.total);
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