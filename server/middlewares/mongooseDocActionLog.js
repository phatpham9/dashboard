'use strict';

module.exports = function mongooseDocActionLog (schema) {
	schema.methods.log = function log (user) {
		var self = this;

		// create
		if (self.isNew) {
			self.created = {
				at: new Date()
			};
			if (user) {
				self.created.by = user;
			}
		}
		// delete
		else if (self.isDirectModified('isDeleted') && self.isDeleted) {
			self.deleted = {
				at: new Date()
			};
			if (user) {
				self.deleted.by = user;
			}
		}
		// update
		else {
			self.updated = {
				at: new Date()
			};
			if (user) {
				self.updated.by = user;
			}
		}

		return self;
	};
};