/**
 * Minify files with UglifyJS.
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-uglify
 */

var app = require('../../app.json');
var filename = app.name + '-' + app.version;

module.exports = function(grunt) {
    grunt.config.set('uglify', {
        options: {
            preserveComments: false
        },
        vendor: {
            files: {
                ['public/assets/scripts/' + filename + '.js']: 'public/assets/scripts/concat.js'
            }
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
