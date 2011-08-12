var _ = underscore = require('underscore'),
	fs = require('fs'),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = mongoose.ObjectId,
	TropySchema = new Schema(/*{
		id: ObjectId,
		title: String,
		body: String,
		date: Date
	}*/),
	TropyModel,
	list = [];

function Database(path) {
	if (!(this instanceof Database)) {
		return new Database(path);
	}
	this.path = path;
	TropyModel = mongoose.model('tropy', TropySchema);
	mongoose.connect(this.path || 'mongo://localhost/utropy');
	TropyModel.find({}, function(err, tropies) {
		tropies.forEach(function(tropy) {
			console.log(tropy.get('id'));
			list.push(tropy.get('id'));
		});
		console.log(list);
	});
}

Database.prototype.random = function(callback) {
	if (list.length < 1) {
		callback.call(this, null, null);
	}
	var index = Math.round(Math.random() * (list.length - 1));
	console.log([index, list[index]]);
	TropyModel.findOne({ _id: list[index] }, function(err, tropy) {
		console.log(['findOne', tropy, _.functions(tropy)]);
		if (_.isFunction(callback)) {
			callback.call(this, err, tropy.toObject(), index, list.length);
		}
	});
};

Database.prototype.add = function(data, callback) {
	var tropy = new TropyModel(data);
	tropy.save(function(err) {
		if (!err) {
			list.push(tropy.get('id'));
		}
		if (_.isFunction(callback)) {
			callback.call(this, err);
		}
	});
};

Database.prototype.update = function(id, data, callback) {
	// TODO: to be implemented
};

module.exports = Database;
