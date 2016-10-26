'use strict';

var _ = require('lodash');

// return promise
module.exports = function mongooseDocExtend (schema) {
	schema.methods.extend = function extend (source) {
		var self = this;
		
		// extend doc
		_.extend(self, source);
		// mark all doc paths are modified
		Object.keys(source).forEach(function(path) {
			self.markModified(path);
		});

		return self;
	}
};