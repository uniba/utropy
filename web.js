/**
 * Module dependencies.
 */
var express = require('express')
  , Resource = require('express-resource')
  , namespace = require('express-namespace');

var config = require(__dirname + '/config')
  , routes = require(__dirname + '/routes')
  , env = process.env
  , app = module.exports = express.createServer();

/**
 * Configuration
 */
app.configure(config.all(app));
app.configure('development', config.development(app));
app.configure('production', config.production(app));

app.helpers({ title: 'μtropy' });

/**
 * Routes
 */
app.get('/', routes.index);
app.get('/random.:format?', routes.entry);
app.get('/entry/:id.:format?', routes.entry);

app.namespace('/admin', function() {
  app.all('*', express.basicAuth(env.UTROPY_ADMIN_USER || 'admin', env.UTROPY_ADMIN_PASS || 'pass'));
  app.get('/', routes.admin.index);
  app.get('entries/page/:page', routes.admin.index);
  app.resource('entries', routes.admin);
});

app.routes.all().forEach(function(route) {
  console.log('  \033[90m%s \033[36m%s\033[0m', route.method.toUpperCase(), route.path);
});

/**
 * Boot
 */
app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
