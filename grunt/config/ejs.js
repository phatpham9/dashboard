/**
 * Render ejs templates.
 *
 * For usage docs see:
 *      https://github.com/shama/grunt-ejs
 */

 module.exports = function(grunt) {
    var app = require('../../app.json');
    grunt.config.set('ejs', {
        dev: {
            cwd: 'server/views',
            src: ['**/*.ejs', '!emails/*'],
            dest: 'server/views',
            expand: true,
            ext: '.html',
            options: {
                isDev: true,
                app: app
            }
        },
        prod: {
            cwd: 'server/views',
            src: ['**/*.ejs', '!emails/*'],
            dest: 'server/views',
            expand: true,
            ext: '.html',
            options: {
                isDev: false,
                app: app
            }
        }
    });

    grunt.loadNpmTasks('grunt-ejs');
};
