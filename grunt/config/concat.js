/**
 * Concatenate files.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */

var app = require('../../app.json');
var filename = app.name + '-' + app.version;

module.exports = function(grunt) {
	grunt.config.set('concat', {
		js: {
			src: require('../pipeline').jsFilesToInject.dev,
			dest: 'public/assets/scripts/' + filename + '.js'
		},
		css: {
			src: require('../pipeline').cssFilesToInject.dev,
			dest: 'public/assets/styles/' + filename + '.css'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};
