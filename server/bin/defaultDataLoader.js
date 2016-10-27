'use strict';

var includeAll = require('include-all');
var path = require('path');
var mongoose = require('mongoose');
var async = require('async');
var _ = require('lodash');

exports.load = function() {
	var defaultData = includeAll({
	    dirname: path.join(__dirname, '../data/default'),
	    filter: /(.+)\.js$/
	});
	async.each(Object.keys(defaultData), function(modelName, cb1) {
		var Model = mongoose.model(_.capitalize(modelName));
		var objects = defaultData[modelName];
		async.each(objects, function(object, cb2) {
			Model.findOne({
				_id: object._id
			})
			.then(function(oldObject) {
				if (oldObject) {
					// update default settings
					if (modelName === 'setting') {
						oldObject.extend({
							key: object.key,
							value: object.value,
							isProtected: true
						})
						.update(cb2);
					}
					// update admin group's default permissions
					else if (modelName === 'group') {
						oldObject.extend({
							permissions: object.permissions,
							isProtected: true
						})
						.update(cb2);
					}
					// update admin user's default group
					else if (modelName === 'user') {
						oldObject.extend({
							email: object.email,
							group: object.group,
							isProtected: true
						})
						.update(cb2);
					}
					// otherwise do nothing
					else {
						cb2();
					}
				} else {
					// create new object
					object = new Model(object);
					object.create(cb2);
				}
			})
			.catch(cb2);
		}, cb1);
	}, function(err) {
		if (err) {
			console.error('--> Default data failed to load', err);
			return;
		}

		console.log('--> Default data loaded');
	});
};