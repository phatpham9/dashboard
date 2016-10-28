'use strict';

var controller = require('./controller');
var passport = require('passport');

module.exports = function(app) {
    app.route('/api/forgotPassword')
        .post(controller.forgotPassword);
    app.route('/api/resetPassword/:token')
        .post(controller.resetPassword);

    app.route('/api/signup')
        .post(controller.signup, passport.authenticate('local', {
            failureFlash: false
        }), controller.login);
    app.route('/api/login')
        .post(passport.authenticate('local', {
            failureFlash: false
        }), controller.login);
    app.route('/api/logout')
        .get(controller.logout);
};
