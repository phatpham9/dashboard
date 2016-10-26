'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app, passport) {
    passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password'
    }, function(login, password, cb) {
        User.findOne({
            email: login,
            isDeleted: false
        })
        .populate([{
            path: 'group',
            select: 'name permissions'
        }])
        .then(function(user) {
            if (!user) {
                return cb(null, false, {
                    message: 'Invalid user'
                });
            }
            if (!user.authenticate(password)) {
                return cb(null, false, {
                    message: 'Invalid password'
                });
            }
            return cb(null, user);
        })
        .catch(cb);
    }));

    passport.serializeUser(function(user, cb) {
        cb(null, user._id);
    });

    passport.deserializeUser(function(id, cb) {
        User.findOne({
            _id: id
        })
        .populate([{
            path: 'group',
            select: 'name permissions'
        }])
        .then(function(user) {
            cb(null, user);
        })
        .catch(cb);
    });
};
