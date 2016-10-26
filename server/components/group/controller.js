'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Group = mongoose.model('Group');
var ACL = require('../../services/ACL');
var httpError = require('../../services/httpError');
var async = require('async');

exports.all = function(req, res, next) {
    var query = {
        isDeleted: false
    };
    var select = '-permissions -isDeleted -created -updated -deleted -__v';
    var sort = req.query.sort || 'name';
    var limit = req.query.limit || 25;
    var skip = req.query.page && req.query.page > 0 ? (req.query.page - 1) * limit : 0;
    var populate = [];
    if (req.query.query) {
        query['$or'] = [{
            name: RegExp(req.query.query, 'i')
        }];
    }
    if (req.query.filter) {
        Object.keys(req.query.filter).forEach(function(key) {
            if (req.query.filter[key]) {
                query[key] = req.query.filter[key];
            }
        });
    }

    Group.find(query)
    .select(select)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate(populate)
    .then(function(groups) {
        res.json(groups);
    })
    .catch(function(err) {
        next(httpError.error500(err));
    });
};

exports.count = function(req, res, next) {
    var query = {
        isDeleted: false
    };
    if (req.query.query) {
        query['$or'] = [{
            name: RegExp(req.query.query, 'i')
        }];
    }
    if (req.query.filter) {
        Object.keys(req.query.filter).forEach(function(key) {
            if (req.query.filter[key]) {
                query[key] = req.query.filter[key];
            }
        });
    }

    Group.count(query)
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
    req.checkBody('name', 'Required').notEmpty();
    req.checkBody('name', 'Max 256 characters').len(0, 256);
    if (req.validationErrors()) {
        return next(httpError.error400(req.validationErrors()));
    }

    async.waterfall([
        // save group
        function(cb) {
            req.group = new Group({
                name: req.body.name,
                permissions: req.body.permissions
            });
            req.group
            .log(req.user)
            .save()
            .then(function() {
                // add group to ACL
                ACL.addGroup(req.group, cb);
            })
            .catch(cb);
        }
    ], function(err) {
        if (err) {
            return next(httpError.error500(err));
        }
        next();
    });
};

exports.get = function(req, res, next, id) {
    // validate input data
    req.checkParams('groupId', 'Invalid').isMongoId();
    if (req.validationErrors()) {
        return next(httpError.error404());
    }

    Group.findOne({
        _id: id,
        isDeleted: false
    })
    .then(function(group) {
        if (!group) {
            return next(httpError.error404());
        }
        req.group = group;
        next();
    })
    .catch(function(err) {
        next(httpError.error500(err));
    });
};

exports.update = function(req, res, next) {
    // check if protected
    if (req.group.isProtected) {
        return next(httpError.error403());
    }

    // validate input data
    req.checkBody('name', 'Required').notEmpty();
    req.checkBody('name', 'Max 256 characters').len(0, 256);
    if (req.validationErrors()) {
        return next(httpError.error400(req.validationErrors()));
    }

    async.waterfall([
        // update group
        function(cb) {
            req.group.extend({
                name: req.body.name,
                permissions: req.body.permissions
            })
            .log(req.user)
            .save()
            .then(function() {
                // update group to ACL
                ACL.updateGroup(req.group, cb);
            })
            .catch(cb);
        }
    ], function(err) {
        if (err) {
            return next(httpError.error500(err));
        }
        next();
    });
};

exports.delete = function(req, res, next) {
    // check if protected
    if (req.group.isProtected) {
        return next(httpError.error403());
    }

    // check if this is my group
    if (req.group.isEqualTo(req.user.group)) {
        return next(httpError.error403());
    }

    async.waterfall([
        // check if not empty
        function(cb) {
            User.count({
                group: req.group,
                isDeleted: false
            })
            .then(function(num) {
                if (num > 0) {
                    return cb('NOT_EMPTY');
                }
                cb();
            })
            .catch(cb);
        },
        // delete group
        function(cb) {
            req.group.extend({
                isDeleted: true
            })
            .log(req.user)
            .save()
            .then(function() {
                // remove group from ACL
                ACL.removeGroup(req.group, cb);
            })
            .catch(cb);
        }
    ], function(err) {
        if (err) {
            if (err === 'NOT_EMPTY') {
                return next(httpError.error400({
                    message: 'Group not empty'
                }));
            }
            return next(httpError.error500(err));
        }
        next();
    });
};

exports.show = function(req, res, next) {
    res.json(req.group.securedInfo());
};