/**
 * Module dependencies.
 */
var express = require('express');

var app = module.exports = express.createServer(),
	db = new require(__dirname + '/lib/db.mongodb.js')(process.env.UTROPY_MONGODB_URI);

// Configuration

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

app.dynamicHelpers({
	title : function(req, res) {
		return 'ntropy';
	}
})

// Routes

app.get('/', function(req, res) {
	var data = db.random(function(err, data, index, length) {
		if (err) {
			res.render('error', {
				error : err
			});
		}
		else if (data == null) {
			res.send(404);
		}
		else {
			res.render('entry', {
				current: index + 1,
				total: length,
				data : data
			});
		}
	});
});

app.get('/add', function(req, res) {
	res.render('add', {
		
	});
});

app.post('/add', function(req, res) {
	console.log(req.body);
	db.add(req.body, function(err, id) {
		console.log(arguments);
		res.redirect('/');
	})
});

app.get('/update/:id', function(req, res) {
	
})

app.post('/update/:id', function(req, res) {
	
});

app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
