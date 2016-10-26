'use strict';

var async = require('async');

module.exports = function(ops) {
	var options = ops || {};
	var keys = options.key ? [].concat(options.key) : [];
	var methods = options.method ? [].concat(options.method) : ['GET'];

	return function(req, res, next) {
		if (keys.length === 0) {
			return next();
		}
		if (methods.indexOf(req.method) === -1) {
			return next();
		}

		var invalidKeys = [];
		async.each(keys, function(key, cb) {
			if (typeof key !== 'string') {
				return cb();
			}
			if (!req.query[key]) {
				return cb();
			}
			
			try {
				req.query[key] = JSON.parse(req.query[key]);
				cb();
			} catch(err) {
				invalidKeys.push(key);
				cb();
			}
		}, function() {
			if (invalidKeys.length > 0) {
				console.log('QueryParserExtend:', invalidKeys.join(', '), ' failed to parse');
			}
			next();
		});
	};
};