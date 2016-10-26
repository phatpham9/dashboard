module.exports = function (grunt) {
	grunt.registerTask('default', [
        'build:dev',
        'concurrent'
    ]);
};