'use strict';

var http = require('http');

exports.start = function(app) {
    // load default data
    require('./defaultDataLoader').load();
    // load ACL
    require('./ACLLoader').load();
    // load middlewares
    require('./middlewaresLoader').load(app);
    // start server
	var server = http.createServer(app);
    if (app.get('env') != 'production') {
        server.listen(app.get('port'));
    } else {
        server.listen(app.get('port'), app.get('host'));
    }
    server.on('error', function(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        var bind = typeof app.get('port') === 'string' ? 'Pipe ' + app.get('port') : 'Port ' + app.get('port');
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    });
    server.on('listening', function() {
        console.log('--> App started:', 'http://' + app.get('host') + ':' + app.get('port'));
    });
};