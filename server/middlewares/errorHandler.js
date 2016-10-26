'use strict';

var httpError = require('../services/httpError');

module.exports = function(app) {
	// handle /!(api)/* requests
	app.route(/(^\/(?!api\/).+)/)
        .all(function(req, res) {
            res.render('errors/error-404');
        });

    // handle /api/* requests
    app.use([function defaultError(req, res, next) {
        next(httpError.error404());
    }, function allErrors(err, req, res, next) {
        res.status(err.status).json({
            message: err.message,
            validationErrors: err.validationErrors || undefined
        });
    }]);
}