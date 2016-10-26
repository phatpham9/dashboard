'use strict';

var acl = require('acl');
var aclConnection = new acl(new acl.memoryBackend());
var async = require('async');

var ACL = {
	// roles
	addGroups: function(groups, cb) {
		async.each(groups, ACL.addGroup, cb);
	},
	addGroup: function(group, cb) {
		aclConnection.allow([group.toACLRole()], cb);
	},
	removeGroup: function(group, cb) {
		aclConnection.removeRole((group._id || group).toString(), cb);
	},
	updateGroup: function(group, cb) {
		ACL.removeGroup(group, function(err) {
			if (err) {
				return cb(err);
			}
			ACL.addGroup(group, cb);
		});
	},
	// user roles
	addUsers: function(users, cb) {
		async.each(users, ACL.addUser, cb);
	},
	addUser: function(user, cb) {
		if (user.group) {
			aclConnection.addUserRoles((user._id || user).toString(), (user.group._id || user.group).toString(), cb);
		} else {
			cb();
		}
	},
	removeUser: function(user, cb) {
		if (user.group) {
			aclConnection.removeUserRoles((user._id || user).toString(), (user.group._id || user.group).toString(), cb);
		} else {
			cb();
		}
	},
	updateUser: function(user, cb) {
		ACL.removeUser(user, function(err) {
			if (err) {
				return cb(err);
			}
			ACL.addUser(user, cb);
		});
	},
	// validations
	isUserAllowed(user, resource, permission, cb) {
		return aclConnection.isAllowed((user._id || user).toString(), resource, permission, cb);
	}
};

module.exports = ACL;