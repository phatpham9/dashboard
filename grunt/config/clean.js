/**
 * Clean files and folders.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-clean
 */

var app = require('../../app.json');
var filename = app.name + '-' + app.version;

module.exports = function(grunt) {
	grunt.config.set('clean', {
		dev: [
            // client assets
            'public/*',
            // server views
            'server/views/**/*.html',
            '!server/views/emails/*'
        ],
		prod: [
            // client assets
            'public/assets/scripts/!(' + filename + ').js',
            'public/assets/styles/!(' + filename + ').css',
            // server views
            'server/views/**/*.html',
            '!server/views/emails/*'
        ]
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
};
