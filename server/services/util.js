'use strict';

exports.isObjectId = function(id) {
    var objectId = new RegExp("^[0-9a-fA-F]{24}$");
    return objectId.test(id);
};

exports.getUserAgent = function(req) {
    return {
        ip: req.get('X-Real-IP') || req.ip,
        browser: {
            name: req.useragent.browser,
            version: req.useragent.version
        },
        os: req.useragent.os,
        platform: req.useragent.platform,
        source: req.useragent.source
    };
};

exports.extend = function(ChildClass, ParentClass) {
    ChildClass.prototype = new ParentClass();
    ChildClass.prototype.constructor = ChildClass;
};