'use strict';

var config = require('./config');
var db = require('./config/database');
var views = require('./config/view');

var express = require('express');
var app = express();
var ejs = require('ejs');
var mongoose = require('mongoose');
var includeAll = require('include-all');
var path = require('path');

// set environment value
app.set('env', process.env.NODE_ENV);
app.set('host', config.host);
app.set('port', config.port);
app.set('views', views.directory);
app.set('view engine', views.engine);
app.engine(views.engine, ejs.renderFile);

mongoose.set('debug', db.debug);
mongoose.Promise = require('bluebird');
// mongoose plugins
mongoose.plugin(require('./middlewares/mongooseDefaultFields'));
mongoose.plugin(require('./middlewares/mongooseDefaultIndexes'));
mongoose.plugin(require('./middlewares/mongooseDocExtend'));
mongoose.plugin(require('./middlewares/mongooseDocMethodsOverride'));
// connect mongoose
mongoose.connect(db.mongodb.url);
mongoose.connection.on('open', function() {
    console.log('--> Mongoose connected:', db.mongodb.url);
    // bootstrap models
    var models = includeAll({
        dirname: path.join(__dirname, './components'),
        filter: /(model)\.js$/
    }) || {};
    for (var model in models) {
        if (models[model].model) {
            models[model].model();
        }
    }
    // start app
    require('./bin').start(app);
});
mongoose.connection.on('error', function(err) {
    console.log('--> Mongoose failed to connect:', db.mongodb.url, err);
    mongoose.disconnect();
});
mongoose.connection.on('close', function() {
    console.log('--> Mongoose connection closed');
});
