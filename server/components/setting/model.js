'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

module.exports = function() {
    var Setting = new Schema({
        key: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        value: {
            type: Schema.Types.Mixed,
            required: true
        },
        isProtected: {
            type: Boolean,
            default: false
        }
    });

    Setting.methods = {
        securedInfo: function() {
            var obj = this.toObject();
            delete obj.isDeleted;
            delete obj.created;
            delete obj.updated;
            delete obj.deleted;
            delete obj.__v;
            return obj;
        }
    };

    Setting.plugin(uniqueValidator);

    mongoose.model('Setting', Setting);
};