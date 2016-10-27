'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var ACL = require('../../services/ACL');
var httpError = require('../../services/httpError');
var mailer = require('../../services/mailer');
var async = require('async');

exports.all = function(req, res, next) {
    var query = {
        isDeleted: false
    };
    var select = '-hashedPassword -salt -resetPasswordToken -resetPasswordExpires -isDeleted -created -updated -deleted -__v';
    var sort = req.query.sort || 'email';
    var limit = req.query.limit || 25;
    var skip = req.query.page && req.query.page > 0 ? (req.query.page - 1) * limit : 0;
    var populate = [{
        path: 'group',
        select: 'name'
    }];
    if (req.query.query) {
        query['$or'] = [{
            email: RegExp(req.query.query, 'i')
        }];
    }
    if (req.query.filter) {
        Object.keys(req.query.filter).forEach(function(key) {
            if (req.query.filter[key]) {
                query[key] = req.query.filter[key];
            }
        });
    }
    
    User.find(query)
    .select(select)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate(populate)
    .then(function(users) {
        res.json(users);
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
            email: RegExp(req.query.query, 'i')
        }];
    }
    if (req.query.filter) {
        Object.keys(req.query.filter).forEach(function(key) {
            if (req.query.filter[key]) {
                query[key] = req.query.filter[key];
            }
        });
    }

    User.count(query)
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
    req.checkBody('email', 'Invalid email').notEmpty().len(1, 256).isEmail();
    req.checkBody('password', 'Min 6 characters').notEmpty().len(6, 256);
    req.checkBody('group', 'Required').notEmpty();
    if (req.validationErrors()) {
        return next(httpError.error400(req.validationErrors()));
    }

    req.body.email = req.body.email.toLowerCase();
    async.series([
        // check exist email
        function(cb) {
            User.findOne({
                email: req.body.email
            })
            .then(function(user) {
                cb(user ? 'ALREADY_IN_USE' : null);
            })
            .catch(cb);
        },
        // save user
        function(cb) {
            req.userAccount = new User({
                email: req.body.email,
                password: req.body.password,
                group: req.body.group
            });
            req.userAccount.createByUser(req.user, cb);
        },
        // add user to ACL
        function(cb) {
            ACL.addUser(req.userAccount, cb);
        }
    ], function(err) {
        if (err) {
            if (err === 'ALREADY_IN_USE') {
                return next(httpError.error400({
                    email: 'Email already in use'
                }));
            }
            return next(httpError.error500(err));
        }
        next();
    });
};

exports.get = function(req, res, next, id) {
    // validate input data
    req.checkParams('userId', 'Invalid').isMongoId();
    if (req.validationErrors()) {
        return next(httpError.error404());
    }

    User.findOne({
        _id: id,
        isDeleted: false
    })
    .then(function(user) {
        if (!user) {
            return next(httpError.error404());
        }
        req.userAccount = user;
        next();
    })
    .catch(function(err) {
        next(httpError.error500(err));
    });
};

exports.update = function(req, res, next) {
    // if user is protected
    if (req.userAccount.isProtected) {
        return next(httpError.error403());
    }

    // validate input data
    req.checkBody('email', 'Invalid email').notEmpty().len(1, 256).isEmail();
    req.checkBody('group', 'Required').notEmpty();
    if (req.validationErrors()) {
        return next(httpError.error400(req.validationErrors()));
    }

    req.body.email = req.body.email.toLowerCase();
    async.series([
        // check exist email
        function(cb) {
            User.findOne({
                _id: {
                    $ne: req.userAccount._id
                },
                email: req.body.email
            })
            .then(function(user) {
                cb(user ? 'ALREADY_IN_USE' : null);
            })
            .catch(cb);
        },
        // save user
        function(cb) {
            req.userAccount.extend({
                email: req.body.email,
                group: req.body.group
            })
            .updateByUser(req.user, cb);
        },
        // add user to ACL
        function(cb) {
            ACL.updateUser(req.userAccount, cb);
        }
    ], function(err) {
        if (err) {
            if (err === 'ALREADY_IN_USE') {
                return next(httpError.error400({
                    email: 'Email already in use'
                }));
            }
            return next(httpError.error500(err));
        }
        next();
    });
};

exports.delete = function(req, res, next) {
    // check if protected
    if (req.userAccount.isProtected) {
        return next(httpError.error403());
    }

    async.series([
        // delete user
        function(cb) {
            req.userAccount.deleteByUser(req.user, cb);
        },
        // remove user from ACL
        function(cb) {
            ACL.removeUser(req.userAccount, cb);
        }
    ], function(err) {
        if (err) {
            return next(httpError.error500(err));
        }
        next();
    });
};

exports.show = function(req, res, next) {
    User.populate(req.userAccount, [{
        path: 'group',
        select: 'name'
    }])
    .then(function() {
        res.json(req.userAccount.securedInfo());
    })
    .catch(function(err) {
        next(httpError.error500(err));
    });
};

exports.getProfile = function(req, res, next) {
    User.findOne({
        _id: req.user._id,
        isDeleted: false
    })
    .then(function(user) {
        if (!user) {
            return next(httpError.error404());
        }
        req.userAccount = user;
        next();
    })
    .catch(function(err) {
        next(httpError.error500(err));
    });
};

exports.updateProfile = function(req, res, next) {
    // validate input data
    req.checkBody('email', 'Invalid email').notEmpty().len(1, 256).isEmail();
    if (req.validationErrors()) {
        return next(httpError.error400(req.validationErrors()));
    }

    req.body.email = req.body.email.toLowerCase();
    async.series([
        // check exist email
        function(cb) {
            User.findOne({
                _id: {
                    $ne: req.userAccount._id
                },
                email: req.body.email
            })
            .then(function(user) {
                cb(user ? 'ALREADY_IN_USE' : null);
            })
            .catch(cb);
        },
        // update user
        function(cb) {
            req.userAccount.extend({
                email: req.body.email
            })
            .updateByUser(req.user, cb);
        }
    ], function(err) {
        if (err) {
            if (err === 'ALREADY_IN_USE') {
                return next(httpError.error400({
                    email: 'Email already in use'
                }));
            }
            return next(httpError.error500(err));
        }
        next();
    });
};

exports.changePassword = function(req, res, next) {
    // validate input data
    req.checkBody('password', 'Min 6 characters').len(6, 256);
    req.checkBody('confirmPassword', 'Not match').equals(req.body.password);
    if (req.validationErrors()) {
        return next(httpError.error400(req.validationErrors()));
    }

    req.userAccount.extend({
        password: req.body.password
    })
    .updateByUser(req.user)
    .then(function() {
        res.json({
            message: 'Done'
        });
        // send email to user
        if (req.userAccount.email) {
            mailer.changePassword(req, res, req.userAccount);
        }
    })
    .catch(function(err) {
        next(httpError.error500(err));
    });
};

exports.showProfile = function(req, res, next) {
    User.populate(req.userAccount, [{
        path: 'group',
        select: 'name permissions'
    }])
    .then(function() {
        res.json(req.userAccount.securedInfo());
    })
    .catch(function(err) {
        next(httpError.error500(err));
    });
};