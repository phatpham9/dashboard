/**
 * Minify files with UglifyJS.
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-uglify
 */

module.exports = function(grunt) {
    grunt.config.set('uglify', {
        options: {
            expression: true,
            preserveComments: false
        },
        public: {
            files: [{
                expand: true,
                cwd: 'public',
                src: ['**/*.js'],
                dest: 'public'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};
