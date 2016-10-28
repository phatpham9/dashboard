'use strict';

angular.module(window.APP.modules.setting)

.controller('settings', ['$scope', '$state', 'translate', 'alertify', 'settingAPI',
    function($scope, $state, translate, alertify, settingAPI) {
        $scope.query = {
            query: undefined,
            sort: 'key',
            page: 1,
            limit: 25
        };
        $scope.count = {
            settings: 0
        };
        search();

        // public functions
        $scope.displayDataType = function(value) {
            switch(typeof value) {
                case 'object':
                    return 'JSON';
                case 'number':
                    return 'number';
                default:
                    return 'text';
            }
        };
        $scope.displayValue = function(value) {
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
        };
        $scope.search = function(sortBy) {
            if (sortBy) {
                $scope.query.sort = sortBy;
            }
            search();
        };
        $scope.canCreate = function() {
            return settingAPI.canCreate();
        };
        $scope.delete = function(setting) {
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
        };
        // private functions
        function search() {
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
                alertify.success(translate('X_HAS_BEEN_DELETED', setting.key));
            });
        }
    }
])

.controller('settingDetails', ['$scope', '$state', '$stateParams', '$modal', '$filter', 'translate', 'alertify', 'settingAPI',
    function($scope, $state, $stateParams, $modal, $filter, translate, alertify, settingAPI) {
        if ($state.current.name === 'settingCreate') {
            $scope.state = 'create';
            $scope.setting = new settingAPI({
                key: undefined,
                value: undefined
            });

            $scope.selectedType = 'text';
            $scope.tmpValue = undefined;
        } else {
            $scope.state = 'details';
            getSetting({
                _id: $stateParams.settingId
            }, function(setting) {
                $scope.setting = setting;

                // parse value after getting
                if (typeof $scope.setting.value === 'object') {
                    $scope.selectedType = 'JSON';
                    $scope.tmpValue = $filter('json')($scope.setting.value, 8);
                } else if (typeof $scope.setting.value === 'number') {
                    $scope.selectedType = 'number';
                    $scope.tmpValue = $scope.setting.value;
                } else {
                    $scope.selectedType = 'text';
                    $scope.tmpValue = String($scope.setting.value);
                }
            });
        }
        $scope.validationErrors = {
            key: undefined,
            value: undefined
        };

        // public functions
        $scope.save = function() {
            if ($scope.form.$valid) {
                // parse value before saving
                if ($scope.selectedType === 'JSON') {
                    try {
                        $scope.setting.value = JSON.parse($scope.tmpValue);
                    } catch(err) {
                        alertify.alert(translate('INVALID_DATA_TYPE'));
                        return;
                    }
                } else if ($scope.selectedType === 'number') {
                    var result = Number($scope.tmpValue);
                    if (isNaN(result)) {
                        alertify.alert(translate('INVALID_DATA_TYPE'));
                        return;
                    }
                    $scope.setting.value = result;
                } else {
                    $scope.setting.value = String($scope.tmpValue);
                }

                if ($scope.state === 'create') {
                    if ($scope.setting.canCreate()) {
                        createSetting($scope.setting, function(setting) {
                            $scope.form.$setPristine();
                            $state.go('settingDetails', {settingId: setting._id});
                        });
                    }
                } else {
                    if ($scope.setting.canEdit()) {
                        updateSetting($scope.setting, function(setting) {
                            $scope.form.$setPristine();
                            $scope.setting = setting;

                            // parse value after saving
                            if (typeof $scope.setting.value === 'object') {
                                $scope.selectedType = 'JSON';
                                $scope.tmpValue = $filter('json')($scope.setting.value, 8);
                            } else if (typeof $scope.setting.value === 'number') {
                                $scope.selectedType = 'number';
                                $scope.tmpValue = $scope.setting.value;
                            } else {
                                $scope.selectedType = 'text';
                                $scope.tmpValue = String($scope.setting.value);
                            }
                        });
                    }
                }
            }
        };
        $scope.delete = function() {
            if ($scope.setting.canDelete()) {
                if (confirm(translate('CONFIRM_DELETE_X', $scope.setting.key))) {
                    deleteSetting($scope.setting, function(setting) {
                        $scope.form.$setPristine();
                        $state.go('settings');
                    });
                }
            }
        };
        // private functions
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
                alertify.success(translate('X_HAS_BEEN_CREATED', setting.key));
            }, function(res) {
                if (res.data.validationErrors) {
                    $scope.validationErrors = res.data.validationErrors;
                }
            });
        }
        function updateSetting(setting, cb) {
            setting.$update(function(setting) {
                if (cb) {
                    cb(setting);
                }
                alertify.success(translate('X_HAS_BEEN_UPDATED', setting.key));
            }, function(res) {
                if (res.data.validationErrors) {
                    $scope.validationErrors = res.data.validationErrors;
                }
            });
        }
        function deleteSetting(setting, cb) {
            setting.$delete(function(setting) {
                if (cb) {
                    cb(setting);
                }
                alertify.success(translate('X_HAS_BEEN_DELETED', setting.key));
            });
        }
    }
]);