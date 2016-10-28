/**
 * Compress CSS files.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-cssmin
 */
 
var app = require('../../app.json');
var filename = app.name + '-' + app.version;

module.exports = function(grunt) {
	grunt.config.set('cssmin', {
        options: {
            keepSpecialComments: 0
        },
		vendor: {
			files: {
                ['public/assets/styles/' + filename + '.css']: 'public/assets/styles/concat.css'
            }
		},
        public: {
            files: [{
                expand: true,
                cwd: 'public',
                src: ['**/*.css', '!assets/**'],
                dest: 'public'
            }]
        }
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
};
