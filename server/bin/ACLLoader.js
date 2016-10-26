'use strict';

var ACL = require('../services/ACL');
var mongoose = require('mongoose');
var Group = mongoose.model('Group');
var User = mongoose.model('User');
var async = require('async');

exports.load = function() {
	async.parallel({
        // load groups list
        groups: function(cb) {
            Group.find({
                isDeleted: false
            })
            .then(function(groups) {
                cb(null, groups);
            })
            .catch(cb);
        },
        // load users list
        users: function(cb) {
            User.find({
                isDeleted: false
            })
            .populate('group')
            .then(function(users) {
                cb(null, users);
            })
            .catch(cb);
        }
    }, function(err, result) {
        if (err) {
            console.error('--> Groups/Users failed to load', err);
            return;
        }
        async.parallel([
            // load groups to acl
            function(cb) {
                ACL.addGroups(result.groups, cb);
            },
            // load users to acl
            function(cb) {
                ACL.addUsers(result.users, cb)
            }
        ], function(err) {
            if (err) {
                console.error('--> ACL failed to load', err);
                return;
            }
            console.log('--> ACL loaded');
        });
    });
};