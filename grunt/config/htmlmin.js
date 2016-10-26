/**
 * Minify HTML files.
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-htmlmin
 */
 module.exports = function(grunt) {
    grunt.config.set('htmlmin', {
        options: {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            minifyJS: true,
            minifyCSS: true
        },
        views: {
            files: [{
                expand: true,
                cwd: 'server/views',
                src: ['**/*.html', '!emails/*.html'],
                dest: 'server/views'
            }]
        },
        public: {
            files: [{
                expand: true,
                cwd: 'public',
                src: '**/*.html',
                dest: 'public'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
};
