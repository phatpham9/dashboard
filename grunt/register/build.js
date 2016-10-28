module.exports = function (grunt) {
	grunt.registerTask('build:dev', [
        'clean:dev',
        'copy',
        'ejs:dev',
        'sails-linker:devJs',
        'sails-linker:devStyles'
    ]);
    grunt.registerTask('build:prod', [
		'clean:dev',
        'copy',
		'concat',
        'clean:prod',
		'cssmin',
		'uglify',
		'json-minify',
		'ejs:prod',
		'sails-linker:prodJs',
		'sails-linker:prodStyles',
		'htmlmin'
	]);
};