﻿'use strict';

var emailConfig = require('../config/email');
var nodemailer = require('nodemailer');

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

exports.notifyAdmin = function(subject, content) {
    send({
        from: emailConfig.emailFrom,
        to: emailConfig.admin,
        subject: subject,
        html: content
    });
};