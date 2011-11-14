/**
 * Module dependencies.
 */

var express = require('express')
  , stylus = require('stylus');

/**
 * Default configuration.
 */
exports.all = function(app) {
  return function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    // app.use(express.session({ secret: 'your secret here' }));
    app.use(stylus.middleware({ src: __dirname + '/public' }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(express.favicon());
    app.enable('jsonp callback');
  };
};

/**
 * Production configuration.
 */
exports.production = function(app) {
  return function() {
    app.use(express.errorHandler());
    app.use(express.logger());
  };
};

/**
 * Development configuration.
 */
exports.development = function(app) {
  return function() {
    app.use(express.errorHandler({
        dumpExceptions : true
      , showStack : true
    }));
    app.use(express.logger('dev'));
  };
};