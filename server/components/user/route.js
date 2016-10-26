'use strict';

var controller = require('./controller');
var auth = require('../../middlewares/auth');

module.exports = function(app) {
    app.route('/api/user')
        .get(auth.isAllowed, controller.all)
        .post(auth.isAllowed, controller.create, controller.show);
    app.route('/api/user/count')
    	.get(auth.isAllowed, controller.count);
    	
    app.param('userId', controller.get);
    app.route('/api/user/:userId')
        .get(auth.isAllowed, controller.show)
        .put(auth.isAllowed, controller.update, controller.show)
        .delete(auth.isAllowed, controller.delete, controller.show);

    app.route('/api/profile')
        .get(auth.isLoggedin, controller.getProfile, controller.showProfile)
    	.put(auth.isLoggedin, controller.getProfile, controller.updateProfile, controller.showProfile);
    app.route('/api/profile/changePassword')
        .put(auth.isLoggedin, controller.getProfile, controller.changePassword);
};
