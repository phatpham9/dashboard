/**
 * Copy files and folders.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {
	grunt.config.set('copy', {
		all: {
            // client
            files: [{
				expand: true,
				cwd: './client',
				src: ['**/*.!(coffee|less)'],
				dest: 'public'
        	},
            // vendors
            {
                expand: true,
                cwd: './bower_components',
                src: [
                    'breakpoints.js/dist/breakpoints.js',
                    'jquery/dist/jquery.js',
                    'angular/angular.js',
                    'angular-i18n/angular-locale_vi.js',
                    'oclazyload/dist/ocLazyLoad.js',
                    'oclazyload/dist/ocLazyLoad.js.map',
                    'angular-bootstrap/ui-bootstrap.js',
                    'angular-bootstrap/ui-bootstrap-tpls.js',
                    'angular-ui-router/release/angular-ui-router.js',
                    'angular-cookies/angular-cookies.js',
                    'angular-resource/angular-resource.js',
                    'angular-sanitize/angular-sanitize.js',
                    // checklist
                    'checklist-model/checklist-model.js',
                    // alertify
                    'alertifyjs/dist/js/alertify.js',
                    'alertifyjs/dist/js/ngAlertify.js',
                    // progress bar
                    'ngprogress/build/ngprogress.js'
                ],
                flatten: true,
                dest: 'public/assets/scripts'
            },
            // styles
            {
        		expand: true,
                cwd: './bower_components',
                src: [
                    'font-awesome/css/font-awesome.css',
                    // alertify
                    'alertify.js/dist/css/alertify.css'
                ],
                flatten: true,
                dest: 'public/assets/styles'
        	},
            // fonts
            {
        		expand: true,
                cwd: './bower_components',
                src: [
                    'font-awesome/fonts/*'
                ],
                flatten: true,
                dest: 'public/assets/fonts'
        	}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
