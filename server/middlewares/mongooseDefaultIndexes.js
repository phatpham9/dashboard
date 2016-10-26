'use strict';

// index accepts single object or objects array
module.exports = function mongooseDefaultIndexes (schema, index) {
	var indexes = [{_id: 1, isDeleted: 1}];
	if (index) {
		indexes = indexes.concat(index);
	}
	// set indexes
	indexes.forEach(function(index) {
		schema.index(index);
	});
};