'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

// accepts object
module.exports = function mongooseDefaultFields (schema, field) {
	var fields = {
		isDeleted: {
	        type: Boolean,
	        default: false
	    },
		created: {
	        at: {
	            type: Date,
	            default: Date.now
	        },
	        by: {
	            type: Schema.ObjectId,
	            ref: 'User'
	        }
	    },
		updated: {
	        at: Date,
	        by: {
	            type: Schema.ObjectId,
	            ref: 'User'
	        }
	    },
		deleted: {
	        at: Date,
	        by: {
	            type: Schema.ObjectId,
	            ref: 'User'
	        }
	    }
	};
	if (field && typeof field === 'object' && !Array.isArray(field)) {
		_.extend(fields, field);
	}

	// add fields
	schema.add(fields);
};