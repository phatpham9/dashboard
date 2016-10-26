'use strict';

module.exports = [{
    _id: '580b3e81c074af26af7f10e8',
    key: 'DEFAULT_PERMISSIONS',
    value: require('../../config/permissions'),
    isProtected: true
}, {
    _id: '5809cd93d4d0ecedf867cef9',
    key: 'MENUBAR',
    value: {
        // main items
        "main": [{
                "type": "separator",
                "auth": {
                    "requiresLogin": true
                }
        }, {
            "type": "item",
            "title": "HOME",
            "state": "home",
            "activeStates": [
                "home"
            ],
            "iconClass": "fa fa-home",
            "auth": {
                "requiresLogin": true
            }
        }],
        // settings
        "settings": [{
            "type": "item",
            "title": "SETTINGS",
            "iconClass": "fa fa-gear",
            "activeStates": [
                "settings",
                "settingCreate",
                "settingDetails",
                "profile",
                "users",
                "userCreate",
                "userDetails",
                "groups",
                "groupCreate",
                "groupDetails"
            ],
            "sub": [{
                "title": "SETTINGS",
                "state": "settings",
                "activeStates": [
                    "settings",
                    "settingCreate",
                    "settingDetails"
                ],
                "auth": {
                    "allows": {
                        "setting": ['get', 'post', 'put', 'delete']
                    }
                }
            }, {
                "title": "USERS",
                "state": "users",
                "activeStates": [
                    "profile",
                    "users",
                    "userCreate",
                    "userDetails"
                ],
                "auth": {
                    "allows": {
                        "user": ['get', 'post', 'put', 'delete']
                    }
                }
            }, {
                "title": "GROUPS",
                "state": "groups",
                "activeStates": [
                    "groups",
                    "groupCreate",
                    "groupDetails"
                ],
                "auth": {
                    "allows": {
                        "group": ['get', 'post', 'put', 'delete']
                    }
                }
            }],
            "auth": {
                "requiresLogin": true,
                "allows": {
                    "setting": ['get', 'post', 'put', 'delete'],
                    "user": ['get', 'post', 'put', 'delete'],
                    "group": ['get', 'post', 'put', 'delete']
                }
            }
        }]
    },
    isProtected: true
}];