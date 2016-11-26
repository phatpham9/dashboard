'use strict';

var config = require('../config');
var session = require('../config/session');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var expressValidator = require('express-validator');
var useragent = require('express-useragent');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')(expressSession);
var passport = require('passport');
var cors = require('cors');
var helmet = require('helmet');
var mongoose = require('mongoose');
var includeAll = require('include-all');
var path = require('path');

exports.load = function(app) {
    // override response header
    app.use(function(req, res, next) {
        res.set('X-Powered-By', 'Dashboard');
        next();
    });
    // common middlewares
    app.use(logger('common'));
    app.use(express.static(config.publicDirectory));
    app.use(useragent.express());
    app.use(require('../middlewares/queryParserExtend')({
        key: 'filter'
    }));
    app.use(cookieParser());
    app.use(bodyParser.json({
        limit: '1mb'
    }));
    app.use(bodyParser.urlencoded({
        limit: '1mb',
        extended: false
    }));
    app.use(methodOverride());
    app.use(expressValidator());
    // session
    app.use(expressSession({
        name: session.name,
        secret: session.secret,
        cookie: session.cookie,
        resave: session.resave,
        saveUninitialized: session.saveUninitialized,
        rolling: session.rolling,
        store: new mongoStore({
            mongooseConnection: mongoose.connection
        })
    }));
    // passport
    app.use(passport.initialize());
    app.use(passport.session());
    require('../middlewares/authStrategies')(app, passport);
    // security
    app.use(cors());
    app.use(helmet());
    // routes
    var routes = includeAll({
        dirname: path.join(__dirname, '../components'),
        filter: /(route)\.js$/
    }) || {};
    for (var route in routes) {
        if (routes[route].route) {
            routes[route].route(app);
        }
    }
    // error handler
    require('../middlewares/errorHandler')(app);
};