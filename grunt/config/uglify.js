/**
 * Minify files with UglifyJS.
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-uglify
 */
module.exports = function(grunt) {
    var app = require('../../app.json');
    var files = {};
    files['public/assets/scripts/' + app.name + '-' + app.version + '.js'] = 'public/assets/scripts/concat.js';
    grunt.config.set('uglify', {
        options: {
            preserveComments: false
        },
        vendor: {
            files: files
        },
        public: {
            files: [{
                expand: true,
                cwd: 'public',
                src: ['**/*.js', '!assets/**'],
                dest: 'public'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};
