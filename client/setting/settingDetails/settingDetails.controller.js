'use strict';

angular
    .module(window.APP.modules.setting)
    .controller('settingDetails', ['$scope', '$state', '$stateParams', '$modal', '$filter', 'translate', 'logger', 'settingAPI',
        function($scope, $state, $stateParams, $modal, $filter, translate, logger, settingAPI) {
            $scope.validationErrors = {
                key: undefined,
                value: undefined
            };
            $scope.save = save;
            $scope.delete = deleteFunc;
            init();

            // functions
            function init() {
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
            }
            function save() {
                if ($scope.form.$valid) {
                    // parse value before saving
                    if ($scope.selectedType === 'JSON') {
                        try {
                            $scope.setting.value = JSON.parse($scope.tmpValue);
                        } catch(err) {
                            logger.alert(translate('INVALID_DATA_TYPE'));
                            return;
                        }
                    } else if ($scope.selectedType === 'number') {
                        var result = Number($scope.tmpValue);
                        if (isNaN(result)) {
                            logger.alert(translate('INVALID_DATA_TYPE'));
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
            }
            function deleteFunc() {
                if ($scope.setting.canDelete()) {
                    if (confirm(translate('CONFIRM_DELETE_X', $scope.setting.key))) {
                        deleteSetting($scope.setting, function(setting) {
                            $scope.form.$setPristine();
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
                        $scope.validationErrors = res.data.validationErrors;
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
                        $scope.validationErrors = res.data.validationErrors;
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