'use strict';

angular
    .module(window.APP.modules.setting)
    .controller('settings', ['$scope', '$state', 'translate', 'logger', 'settingAPI',
        function($scope, $state, translate, logger, settingAPI) {
            $scope.query = {
                query: undefined,
                sort: 'key',
                page: 1,
                limit: 25
            };
            $scope.count = {
                settings: 0
            };
            $scope.displayDataType = displayDataType;
            $scope.displayValue = displayValue;
            $scope.search = searchSettings;
            $scope.canCreate = canCreate;
            $scope.delete = deleteFunc;
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
                            $scope.settings.forEach(function(obj, index) {
                                if (obj._id === setting._id) {
                                    $scope.settings.splice(index, 1);
                                }
                            });
                        });
                    }
                }
            }

            function searchSettings(sortBy) {
                if (sortBy) {
                    $scope.query.sort = sortBy;
                }
                getSettings($scope.query, function(settings) {
                    $scope.settings = settings;
                    countSettings($scope.query, function(total) {
                        $scope.count.settings = total;
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
    ]);