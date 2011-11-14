var _ = underscore = require('underscore')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.ObjectId
  , TropySchema = new Schema({
		    title: String
		  , body: { type: String, required: true }
		  , num: { type: Number, unique: true }
    })
	, TropyModel = mongoose.model('tropy', TropySchema)
	, conn = []
	, noop = function() {};

TropySchema.pre('save', function(next) {
  console.log('pre-save');
  var self = this;
  if (this.isNew) {
    this.created_at = new Date();
  } else {
    this.modified_at = new Date();
  }
  console.log(this.created_at);
  console.log(this.modified_at);
  
  TropyModel
    .find({})
    .desc('num')
    .limit(1)
    .run(function(err, doc) {
      console.log(err, doc);
      if (err) {
        next(err);
      } else {
        self.num = doc.pop().num + 1;
        next();
      }
    })
});

function Database(path) {
  this.path = path || 'mongodb://localhost/utropy';
	if (conn[this.path]) {
	  return conn[this.path];
	}
	if (!(this instanceof Database)) {
		return conn[this.path] = new Database(this.path);
	}
	mongoose.connect(this.path);
}

Database.prototype.random = function(callback) {
	this.count(function(err, count) {
	  if (count < 1) {
	    callback.call(this, null, null);
	  } else {
	    var index = Math.round(Math.random() * (count - 1));
	    TropyModel
	      .find({})
	      .skip(index)
	      .limit(1)
	      .exec(function(err, doc) {
	        callback.call(this, err, doc.shift(), count);
	      });
	  }
	});
};

Database.prototype.add = function(data, callback) {
	var tropy = new TropyModel(data);
	
	tropy.save(function(err) {
		if (_.isFunction(callback)) {
			callback.call(this, err);
		}
	});
};

Database.prototype.update = function(id, data, callback) {
  TropyModel.findById(id, function(err, doc) {
    if (err) {
      return callback.call(this, err, doc);
    }
    doc
      .set('title', data.title)
      .set('body', data.body)
      .set('num', -1)
      .save(function(err) {
        callback.call(this, err, doc);
      });
  });
};

Database.prototype.list = function(page, callback) {
  var limit = 10
    , callback = callback || noop;
  
  TropyModel
    .find({})
    .desc('num')
    .limit(limit)
    .skip((page - 1) * limit)
    .exec(function(err, doc) {
      callback.call(this, err, doc, 10);
    });
};

Database.prototype.find = function(id, callback) {
  if (id === null) {
    this.random(callback);
  } else {
    this.count(function(err, count) {
      if (err) {
        return callback.call(this, err, null, null);
      }
      TropyModel.findById(id, function(err, tropy) {
        if (_.isFunction(callback)) {
          callback.call(this, err, tropy, count);
        }
      });
    });
  }
};

Database.prototype.destroy = function(id, callback) {
  TropyModel.findById(id, function(err, doc) {
    callback.call(this, err, doc);
  });
}

Database.prototype.count = function(callback) {
  TropyModel
    .count({})
    .exec(callback || noop);
};

module.exports = Database;