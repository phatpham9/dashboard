/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * For usage docs see:
 * 		https://github.com/Zolmeister/grunt-sails-linker
 */
module.exports = function(grunt) {
	grunt.config.set('sails-linker', {
		devJs: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="%s"></script>',
				appRoot: 'public'
			},
			files: {
				'server/views/layout.html': require('../pipeline').jsFilesToInject.dev
			}
		},
		prodJs: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script async src="%s"></script>',
				appRoot: 'public'
			},
			files: {
				'server/views/layout.html': require('../pipeline').jsFilesToInject.prod
			}
		},

		devStyles: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="%s">',
				appRoot: 'public'
			},
			files: {
				'server/views/layout.html': require('../pipeline').cssFilesToInject.dev,
				'server/views/errors/*.html': require('../pipeline').cssFilesToInject.dev
			}
		},
		prodStyles: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link async rel="stylesheet" href="%s">',
				appRoot: 'public'
			},
			files: {
				'server/views/layout.html': require('../pipeline').cssFilesToInject.prod,
				'server/views/errors/*.html': require('../pipeline').cssFilesToInject.prod
			}
		}
	});

	grunt.loadNpmTasks('grunt-sails-linker');
};
