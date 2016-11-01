/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */


// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = {
    dev: [
        'assets/styles/font-awesome.css',
        'assets/styles/bootstrap.css',
        'assets/styles/bootstrap-extend.css',
        'assets/styles/fonts.css',
        'assets/styles/**/*.css',
        'assets/styles/site.css'
    ],
    prod: [
        'assets/styles/**/*.css'
    ]
};


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = {
    dev: [
        // vendors
        'assets/scripts/breakpoints.js',
        'assets/scripts/jquery.js',
        'assets/scripts/angular.js',
        'assets/scripts/angular-locale_vi.js',
        'assets/scripts/ui-bootstrap.js',
        'assets/scripts/ui-bootstrap-tpls.js',
        'assets/scripts/ocLazyLoad.js',
        'assets/scripts/**/*.js',
        'assets/scripts/site.js',
        // app module & config
        'app.module.js',
        'app.config.js',
        // modules & routes
        '!(apis|assets|components|services)/*.module.js',
        '!(apis|assets|components|services)/*.routes.js',
        // services
        'services/*.service.js',
        // service apis
        'apis/settingAPI.service.js',
        // components
        'components/**/*.directive.js'
    ],
    prod: [
        'assets/scripts/**/*.js'
    ]
};


// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = {
    dev: cssFilesToInject.dev.map(function(path) {
        return 'public/' + path;
    }),
    prod: cssFilesToInject.prod.map(function(path) {
        return 'public/' + path;
    })
};
module.exports.jsFilesToInject = {
    dev: jsFilesToInject.dev.map(function(path) {
        return 'public/' + path;
    }),
    prod: jsFilesToInject.prod.map(function(path) {
        return 'public/' + path;
    })
};
