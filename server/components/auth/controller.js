'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var async = require('async');
var crypto = require('crypto');
var mailer = require('../../services/mailer');
var ACL = require('../../services/ACL');
var httpError = require('../../services/httpError');

exports.signup = function(req, res, next) {
    // validate input data
    req.checkBody('email', 'Invalid email').notEmpty().len(1, 256).isEmail();
    req.checkBody('password', 'Min 6 characters').notEmpty().len(6, 256);
    if (req.validationErrors()) {
        return next(httpError.error400(req.validationErrors()));
    }

    req.body.email = req.body.email.toLowerCase();
    async.series([
        // check exist account or email
        function(cb) {
            User.findOne({
                $or: [{
                    email: req.body.email
                }]
            })
            .then(function(user) {
                cb(user ? 'ALREADY_IN_USE' : null);
            })
            .catch(cb);
        },
        // save user
        function(cb) {
            req.userAccount = new User({
                email: req.body.email,
                password: req.body.password
            });
            req.userAccount.create(cb);
        },
        // add user to ACL
        // function(cb) {
        //     ACL.addUser(req.userAccount, cb);
        // }
    ], function(err) {
        if (err) {
            if (err === 'ALREADY_IN_USE') {
                return next(httpError.error400({
                    email: 'Email already in use'
                }));
            }
            return next(httpError.error500(err));
        }
        next();
        // send welcome email
        mailer.signupSuccessful(req, res, req.userAccount);
        // notify admin that there's new registered account
        mailer.alertNewUser(req, res, req.userAccount);
    });
};

exports.login = function(req, res, next) {
    res.json(req.user.securedInfo());
};

exports.logout = function(req, res, next) {
    // do logout
    req.logout();
    res.json({
        message: 'Done'
    });
};

exports.forgotPassword = function(req, res, next) {
    // validate input data
    req.checkBody('email', 'Invalid invalid').notEmpty().len(1, 256).isEmail();
    if (req.validationErrors()) {
        return next(httpError.error400(req.validationErrors()));
    }

    async.waterfall([
        // generate token
        function(cb) {
            crypto.randomBytes(20, function(err, buf) {
                if (err) {
                    return cb(err);
                }
                var token = buf.toString('hex');
                cb(null, token);
            });
        },
        // check email exists
        function(token, cb) {
            User.findOne({
                email: req.body.email.toLowerCase()
            })
            .then(function(user) {
                if (!user) {
                    return cb('NOT_EXIST');
                }
                cb(null, user, token);
            })
            .catch(cb);
        },
        // save user
        function(user, token, cb) {
            user.extend({
                resetPasswordToken: token,
                resetPasswordExpires: new Date().setHours(new Date().getHours() + 1) // 1 hour
            })
            .update(cb);
        }
    ], function(err) {
        if (err) {
            if (err === 'NOT_EXIST') {
                return next(httpError.error400({
                    email: 'Email not exist'
                }));
            }
            return next(httpError.error500(err));
        }
        res.json({
            message: 'Done'
        });
        // send email to user
        mailer.forgotPassword(req, res, user, token);
    });
};

exports.resetPassword = function(req, res, next) {
    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: new Date()
        }
    })
    .then(function(user) {
        if (!user) {
            return next(httpError.error400({
                token: 'Invalid or expired'
            }));
        }

        req.checkBody('password', 'Min 6 characters').len(6, 256);
        req.checkBody('confirmPassword', 'Not match').equals(req.body.password);
        if (req.validationErrors()) {
            return next(httpError.error400(req.validationErrors()));
        }

        user.extend({
            password: req.body.password,
            resetPasswordToken: undefined,
            resetPasswordExpires: undefined
        })
        .update()
        .then(function() {
            res.json({
                message: 'Done'
            });
            // send email to user
            mailer.resetPasswordSuccessful(req, res, user);
        })
        .catch(function(err) {
            next(httpError.error500(err));
        });
    })
    .catch(function(err) {
        next(httpError.error500(err));
    });
};
