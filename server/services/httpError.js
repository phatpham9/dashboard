'use strict';

function mapValidationErrors(validationErrors) {
    var result = {};
    for (var i = 0; i < validationErrors.length; i++) {
        result[validationErrors[i].param] = validationErrors[i].msg;
    };
    return result;
}

exports.error400 = function(message) {
    var error = new Error(typeof message === 'string' ? message : 'Bad request');
    if (typeof message === 'object') {
        error.validationErrors = Array.isArray(message) ? mapValidationErrors(message) : message;
    }
    error.status = 400;
    return error;
};

exports.error401 = function(message) {
    var error = new Error(message || 'Unauthorized');
    error.status = 401;
    return error;
};

exports.error403 = function(message) {
    var error = new Error(message || 'Forbidden');
    error.status = 403;
    return error;
};

exports.error404 = function(message) {
    var error = new Error(message || 'Request not found');
    error.status = 404;
    return error;
};

exports.error500 = function(err, message) {
    err = err || new Error(message || 'Internal server error');
    err.status = 500;
    return err;
};