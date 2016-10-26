'use strict';

var httpError = require('../services/httpError');
var ACL = require('../services/ACL');

exports.isLoggedin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return next(httpError.error401());
    }
    next();
};

exports.isAllowed = function(req, res, next) {
	if (!req.isAuthenticated()) {
        return next(httpError.error401());
    }

	var resource = req.path.split('/')[2];
	var permission = req.method.toLowerCase();

	ACL.isUserAllowed(req.user, resource, permission, function(err, allowed) {
		if (err || !allowed) {
			return next(httpError.error403());
		}
		
		next();
	});
};