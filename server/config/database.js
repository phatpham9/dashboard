'use strict';

var host = process.env.DB_HOST || 'localhost';
var port = process.env.DB_PORT || '27017';
var database = process.env.DB_NAME || require('../../app.json').name + '-dev';

module.exports = {
	debug: process.env.NODE_ENV !== 'production',
	mongodb: {
	    url: 'mongodb://' + host + ':' + port + '/' + database + '?reconnectTries=10&reconnectInterval=3000'
	}
};