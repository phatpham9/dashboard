'use strict';

var controller = require('./controller');
var auth = require('../../middlewares/auth');

module.exports = function(app) {
    app.route('/api/group')
        .get(auth.isAllowed, controller.all)
        .post(auth.isAllowed, controller.create, controller.show);
    app.route('/api/group/count')
    	.get(auth.isAllowed, controller.count);

    app.param('groupId', controller.get);
    app.route('/api/group/:groupId')
        .get(auth.isAllowed, controller.show)
        .put(auth.isAllowed, controller.update, controller.show)
        .delete(auth.isAllowed, controller.delete, controller.show);
};
