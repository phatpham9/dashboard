/**
 * Compress CSS files.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-cssmin
 */
module.exports = function(grunt) {
    var app = require('../../app.json');
    var files = {};
    files['public/assets/styles/' + app.name + '-' + app.version + '.css'] = 'public/assets/styles/concat.css';
	grunt.config.set('cssmin', {
        options: {
            keepSpecialComments: 0
        },
		vendor: {
			files: files
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
