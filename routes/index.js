var env = process.env
  , db = new require('../lib/db.mongodb.js')(env.UTROPY_MONGODB_URI);

exports.entry = function(req, res) {
  var params
    , format = req.params.format || 'html';
  
  db.find(req.params.id, function(err, data, length) {
    console.log(arguments);
    if (err) {
      return res.render('error', { error: err });
    }
    if (data === null) {
      return res.send(404);
    }
    
    params = {
        layout: 'layouts/layout'
      , total: length
      , data: data
      , reload: false
    };
    
    if (format === 'json') {
      res.send(params);
    } else {
      res.render('entry', params);
    }
  });
};

exports.random = function(req, res) {
  var params
    , format = req.params.format || 'html';
  
  db.find(null, function(err, data, length) {
    console.log(arguments);
    if (err) {
      return res.render('error', { error : err });
    }
    if (data === null) {
      return res.send(404);
    }
    
    params = {
        layout: 'layouts/layout'
      , total: length
      , data: data
      , reload: false
    };
    
    if (format === 'json') {
      res.send(params);
    } else {
      res.render('entry', params);
    }
  });
};

exports.admin = require('./admin.js');