var env = process.env
  , db = new require('../lib/db.mongodb.js')(env.UTROPY_MONGODB_URI);

exports.index = function(req, res) {
  res.render('index', {
    layout: 'layouts/layout'
  });
};

exports.entry = function(req, res) {
  var params
    , id = req.params.id || null
    , format = req.params.format || 'html';
  
  db.find(id, function(err, data, length) {
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
    , reload: !id
    };
    
    if (format === 'json') {
      res.send(params);
    } else {
      res.render('entry', params);
    }
  });
};

exports.admin = require('./admin.js');