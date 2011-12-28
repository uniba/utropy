/**
 * Module dependencies.
 */

var express = require('express')
  , stylus = require('stylus');

module.exports = function(app) {
  return {
    all: function() {
      app.set('views', __dirname + '/views');
      app.set('view engine', 'jade');
      app.use(express.bodyParser());
      app.use(function(req, res, next) {
        req.body._method = req.body._method || req.query._method || req.method;
        next();
      });
      app.use(express.methodOverride());
      app.use(express.cookieParser());
      // app.use(express.session({ secret: 'your secret here' }));
      app.use(stylus.middleware({ src: __dirname + '/public' }));
      app.use(app.router);
      app.use(express.static(__dirname + '/public'));
      app.use(express.favicon());
      app.enable('jsonp callback');
    }
  , production: function() {
      app.use(express.errorHandler());
      app.use(express.logger());
    }
  , development: function() {
      app.use(express.errorHandler({ dumpExceptions : true, showStack : true }));
      app.use(express.logger('dev'));
    }
  };
};
