/**
 * Compress JSON files.
 *
 * For usage docs see:
 * 		https://www.npmjs.com/package/grunt-json-minify
 */

module.exports = function(grunt) {
	grunt.config.set('json-minify', {
        public: {
            files: 'public/**/*.json'
        }
	});

	grunt.loadNpmTasks('grunt-json-minify');
};
