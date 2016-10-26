/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-watch
 */
module.exports = function(grunt) {
    grunt.config.set('watch', {
        serverReboot: {
            files: ['.rebooted'],
            options: {
                livereload: true
            }
        },
        clientDir: {
            files: ['client/**/*'],
            tasks: ['sync:client'],
            options: {
                livereload: true
            }
        },
        gruntConfig: {
            files: ['grunt/config/!(concurrent|nodemon|sync|watch).js'],
            tasks: ['build:dev']
        },
        gruntPipeline: {
            files: ['grunt/pipeline.js'],
            tasks: ['sails-linker:devJs', 'sails-linker:devStyles']
        },
        appConfig: {
            files: ['app.json'],
            tasks: ['ejs:dev', 'sails-linker:devJs', 'sails-linker:devStyles']
        },
        gruntWatch: {
            files: ['grunt/config/watch.js'],
            options: {
                reload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};
