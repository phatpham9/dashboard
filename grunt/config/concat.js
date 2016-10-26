/**
 * Concatenate files.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {
	grunt.config.set('concat', {
		js: {
			src: require('../pipeline').jsFilesToInject.dev,
			dest: 'public/assets/scripts/concat.js'
		},
		css: {
			src: require('../pipeline').cssFilesToInject.dev,
			dest: 'public/assets/styles/concat.css'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};
