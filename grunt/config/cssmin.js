/**
 * Compress CSS files.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-cssmin
 */

module.exports = function(grunt) {
	grunt.config.set('cssmin', {
        options: {
            keepSpecialComments: 0
        },
        public: {
            files: [{
                expand: true,
                cwd: 'public',
                src: ['**/*.css'],
                dest: 'public'
            }]
        }
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
};
