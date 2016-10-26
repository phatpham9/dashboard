module.exports = function(grunt) {
    grunt.config.set('nodemon', {
        dev: {
            script: 'server/app.js',
            options: {
                args: ['dev'],
                watch: ['server'],
                ignore: ['node_modules/**'],
                ext: 'js, html',
                nodeArgs: ['--debug'],
                delayTime: 1,
                cwd: './',
                callback: function(nodemon) {
                    // refreshes browser when server reboots
                    nodemon.on('restart', function() {
                        setTimeout(function() {
                            require('fs').writeFileSync('.rebooted', 'rebooted');
                        }, 1000);
                    });
                }
            }
        },
        prod: {
            script: 'server/app.js',
            options: {
                delayTime: 1,
                cwd: './'
            }
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');
};
