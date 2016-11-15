'use strict';

var ACL = require('../services/ACL');
var mongoose = require('mongoose');
var Group = mongoose.model('Group');
var User = mongoose.model('User');
var async = require('async');

exports.load = function(cb1) {
	async.parallel({
        // load groups list
        groups: function(cb2) {
            Group.find({
                isDeleted: false
            })
            .then(function(groups) {
                cb2(null, groups);
            })
            .catch(cb2);
        },
        // load users list
        users: function(cb2) {
            User.find({
                isDeleted: false
            })
            .populate('group')
            .then(function(users) {
                cb2(null, users);
            })
            .catch(cb2);
        }
    }, function(err, result) {
        if (err) {
            console.error('--> Groups/Users failed to load', err);
            return cb1(err);
        }
        async.parallel([
            // load groups to acl
            function(cb2) {
                ACL.addGroups(result.groups, cb2);
            },
            // load users to acl
            function(cb2) {
                ACL.addUsers(result.users, cb2)
            }
        ], function(err) {
            if (err) {
                console.error('--> ACL failed to load', err);
                return cb1(err);
            }
            console.log('--> ACL loaded');
            cb1();
        });
    });
};