'use strict';

var emailConfig = require('../config/email');
var nodemailer = require('nodemailer');

exports.signupSuccessful = function(req, res, user) {
    res.render('emails/signup-successful', {
        user: user,
        loginUrl: 'http://' + req.headers.host + '/#/login'
    }, function (err, html) {
        if (err) {
            console.error(err);
        } else {
            send({
                from: emailConfig.emailFrom,
                to: user.email,
                subject: 'You have signed up!',
                html: html
            });
        }
    });
};

exports.forgotPassword = function(req, res, user, token) {
    res.render('emails/forgot-password', {
        user: user,
        resetPasswordUrl: 'http://' + req.headers.host + '/#/reset-password/' + token
    }, function (err, html) {
        if (err) {
            console.error(err);
        } else {
            send({
                from: emailConfig.emailFrom,
                to: user.email,
                subject: 'Reset Your Password',
                html: html
            });
        }
    });
};

exports.resetPasswordSuccessful = function(req, res, user) {
    res.render('emails/reset-password-successful', {
        user: user,
        loginUrl: 'http://' + req.headers.host + '/#/login'
    }, function (err, html) {
        if (err) {
            console.error(err);
        } else {
            send({
                from: emailConfig.emailFrom,
                to: user.email,
                subject: 'Password Reset',
                html: html
            });
        }
    });
};

exports.changePassword = function(req, res, user) {
    res.render('emails/change-password', {
        user: user
    }, function (err, html) {
        if (err) {
            console.error(err);
        } else {
            send({
                from: emailConfig.emailFrom,
                to: user.email,
                subject: 'Password Changed',
                html: html
            });
        }
    });
};

exports.alertNewUser = function(req, res, user) {
    res.render('emails/new-user-alert', {
        user: user
    }, function (err, html) {
        if (err) {
            console.error(err);
        } else {
            send({
                from: emailConfig.emailFrom,
                to: emailConfig.admin,
                subject: 'New user registered!',
                html: html
            });
        }
    });
};

function send(mailOptions) {
    var transport = nodemailer.createTransport(emailConfig.mailer);
    transport.sendMail(mailOptions, function(err, res) {
        if (err) {
            console.error(err);
        } else {
            console.log(res);
        }
    });
};