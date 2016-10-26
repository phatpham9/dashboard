'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
    var Group = new Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        permissions: {
            type: Schema.Types.Mixed
        },
        isProtected: {
            type: Boolean,
            default: false
        }
    });

    Group.methods = {
        securedInfo: function() {
            var obj = this.toObject();
            delete obj.isDeleted;
            delete obj.created;
            delete obj.updated;
            delete obj.deleted;
            delete obj.__v;
            return obj;
        },
        toACLRole: function() {
            var group = this.toObject();
            var result = {
                roles: group._id.toString(),
                allows: []
            };
            if (group.permissions && Object.keys(group.permissions).length > 0) {
                Object.keys(group.permissions).forEach(function(resource) {
                    result.allows.push({
                        resources: resource,
                        permissions: group.permissions[resource]
                    });
                });
            }
            return result;
        },
        isEqualTo: function(group) {
            return this._id.toString() === (group._id || group);
        }
    };

    mongoose.model('Group', Group);
}