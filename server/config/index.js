'use strict';

var path = require('path');

module.exports = {
    root: path.join(__dirname, '../..'),
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '9000',

    publicDirectory: path.join(__dirname, '../../public')
};
