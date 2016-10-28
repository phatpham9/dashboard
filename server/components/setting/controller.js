'use strict';

var mongoose = require('mongoose');
var Setting = mongoose.model('Setting');
var httpError = require('../../services/httpError');
var util = require('../../services/util');
var async = require('async');

exports.all = function(req, res, next) {
    var query = {
        isProtected: false,
        isDeleted: false
    };
    var select = '-isDeleted -created -updated -deleted -__v';
    var sort = req.query.sort || 'key';
    var limit = req.query.limit || 25;
    var skip = req.query.page && req.query.page > 0 ? (req.query.page - 1) * limit : 0;
    var populate = [];
    if (req.query.query) {
        query['$or'] = [{
            key: RegExp(req.query.query, 'i')
        }];
    }
    if (req.query.filter) {
        Object.keys(req.query.filter).forEach(function(key) {
            if (req.query.filter[key]) {
                query[key] = req.query.filter[key];
            }
        });
    }

    Setting.find(query)
    .select(select)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate(populate)
    .then(function(settings) {
        res.json(settings);
    })
    .catch(function(err) {
        next(httpError.error500(err));
    });
};

exports.count = function(req, res, next) {
    var query = {
        isProtected: false,
        isDeleted: false
    };
    if (req.query.query) {
        query['$or'] = [{
            key: RegExp(req.query.query, 'i')
        }];
    }
    if (req.query.filter) {
        Object.keys(req.query.filter).forEach(function(key) {
            if (req.query.filter[key]) {
                query[key] = req.query.filter[key];
            }
        });
    }

    Setting.count(query)
    .then(function(num) {
        res.json({
            total: num
        });
    })
    .catch(function(err) {
        next(httpError.error500(err));
    });
};

exports.create = function(req, res, next) {
    // validate input data
    req.checkBody('key', 'Required').notEmpty();
    req.checkBody('value', 'Required').notEmpty();
    if (req.validationErrors()) {
        return next(httpError.error400(req.validationErrors()));
    }

    // check if key exists
    Setting.findOne({
        key: req.body.key
    })
    .then(function(setting) {
        if (setting) {
            return next(httpError.error400({
                key: 'Already in use'
            }));
        }

        req.setting = new Setting({
            key: req.body.key,
            value: req.body.value
        });
        req.setting.createByUser(req.user)
        .then(function() {
            next();
        })
        .catch(function(err) {
            next(httpError.error500(err));
        });
    })
    .catch(function(err) {
        next(httpError.error500(err));
    });
};

exports.get = function(req, res, next, id) {
    // validate input data
    req.checkParams('settingId', 'Required').notEmpty();
    if (req.validationErrors()) {
        return next(httpError.error404());
    }

    var query = {
        isDeleted: false
    };
    if (util.isObjectId(id)) {
        query._id = id;
    } else {
        query.key = id;
    }

    Setting.findOne(query)
    .then(function(setting) {
        if (!setting) {
            return next(httpError.error404());
        }
        req.setting = setting;
        next();
    })
    .catch(function(err) {
        next(httpError.error500(err));
    });
};

exports.update = function(req, res, next) {
    // check if protected
    if (req.setting.isProtected) {
        return next(httpError.error403());
    }
    
    // validate input data
    req.checkBody('key', 'Required').notEmpty();
    req.checkBody('value', 'Required').notEmpty();
    if (req.validationErrors()) {
        return next(httpError.error400(req.validationErrors()));
    }

    // check if key exists
    Setting.findOne({
        _id: {
            $ne: req.setting._id
        },
        key: req.body.key
    })
    .then(function(setting) {
        if (setting) {
            return next(httpError.error400({
                key: 'Already in use'
            }));
        }

        req.setting.extend({
            key: req.body.key,
            value: req.body.value
        })
        .updateByUser(req.user)
        .then(function() {
            next();
        })
        .catch(function(err) {
            next(httpError.error500(err));
        });
    })
    .catch(function(err) {
        next(httpError.error500(err));
    });
};

exports.delete = function(req, res, next) {
    // check if protected
    if (req.setting.isProtected) {
        return next(httpError.error403());
    }

    req.setting.deleteByUser(req.user)
    .then(function() {
        next();
    })
    .catch(function(err) {
        next(httpError.error500(err));
    });
};

exports.show = function(req, res, next) {
    res.json(req.setting.securedInfo());
};

exports.getMenubar = function(req, res, next) {
    var query = {
        key: 'MENUBAR',
        isDeleted: false
    };

    Setting.findOne(query)
    .then(function(setting) {
        if (!setting) {
            return next(httpError.error404());
        }
        req.setting = setting;
        next();
    })
    .catch(function(err) {
        next(httpError.error500(err));
    });
};