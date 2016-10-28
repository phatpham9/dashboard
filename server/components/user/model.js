'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var uniqueValidator = require('mongoose-unique-validator');

module.exports = function() {
    var User = new Schema({
        email: {
            type: String,
            match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        group: {
            type: Schema.ObjectId,
            ref: 'Group'
        },
        isProtected: {
            type: Boolean,
            default: false
        },

        hashedPassword: String,
        salt: String,
        resetPasswordToken: String,
        resetPasswordExpires: Date
    });

    User.virtual('password').set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.hashPassword(password);
    }).get(function() {
        return this._password;
    });

    User.methods = {
        makeSalt: function() {
            return crypto.randomBytes(16).toString('base64');
        },
        hashPassword: function(password) {
            if (!password || !this.salt) return '';
            var salt = new Buffer(this.salt, 'base64');
            return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');
        },
        authenticate: function(password) {
            return this.hashPassword(password) === this.hashedPassword;
        },
        securedInfo: function() {
            var obj = this.toObject();
            delete obj.hashedPassword;
            delete obj.salt;
            delete obj.resetPasswordToken;
            delete obj.resetPasswordExpires;
            delete obj.isDeleted;
            delete obj.created;
            delete obj.updated;
            delete obj.deleted;
            delete obj.__v;
            return obj;
        },
        isMe: function(user) {
            return this._id.toString() === (user._id || user).toString();
        }
    };

    User.plugin(uniqueValidator);

    mongoose.model('User', User);
}