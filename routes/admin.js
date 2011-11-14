var db = new require('../lib/db.mongodb.js')(process.env.UTROPY_MONGODB_URI);

exports.index = function(req, res) {
  var page = req.params.page || 1;
  db.list(page, function(err, entries, total) {
    if (err) {
      return res.render('error', { error: err });
    }
    res.render('admin/index', {
        layout: 'layouts/admin'
      , entries: entries
    });
  });
};

exports.new = function(req, res) {
  res.render('admin/new', {
      layout: 'layouts/admin'
  });
};

exports.create = function(req, res) {
  var entry = req.body.entry;
  
  db.add(entry, function(err) {
    console.log(err);
    if (err) {
      res.render('error', { error: err });
    } else {
      res.redirect('/admin/entries');
    }
  });
};

/*
exports.show = function(req, res) {
  res.send('show ' + req.params.id);
};
*/

exports.edit = function(req, res) {
  var id = req.params.entrie;
  
  db.find(id, function(err, doc) {
    if (err) {
      res.render('error', { error: err });
    } else {
      res.render('admin/edit', {
          layout: 'layouts/admin'
        , entry: doc
      });
    }
  });
};

exports.update = function(req, res) {
  var id = req.params.entrie
    , entry = req.body.entry;
  
  db.update(id, entry, function(err, doc) {
    if (err) {
      res.render('error', { error: err });
    } else {
      res.redirect('/admin/entries');
    }
  });
};

exports.destroy = function(req, res) {
  var id = req.params.entrie;
  
  db.destroy(id, function(err) {
    if (err) {
      res.render('error', { error: err });
    } else {
      res.redirect('/admin/entries');
    }
  });
};