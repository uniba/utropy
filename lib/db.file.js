var fs = require('fs'),
  list = [];

function Database(path) {
  if (!(this instanceof Database)) {
    return new Database(path);
  }
  this.path = path;
  fs.readdir(path, function(err, files) {
    list = files;
  });
}

Database.prototype.random = function(callback) {
  if (list.length < 1) {
    callback.apply([null, null]);
  }
  var index = Math.round(Math.random() * (list.length - 1));
  console.log('random id: ' + index);
  fs.readFile(this.path + '/' + list[index], function(err, data) {
  	callback(err, JSON.parse(data.toString()), index, list.length);
  });
};

Database.prototype.add = function(data, callback) {
  var id = (new Date()).getTime();
  fs.writeFile(this.path + '/' + id + '.json', JSON.stringify(data), function(err) {
  	if (!err) {
  		list.push(id + '.json');
  	}
  	callback(err, id);
  });
};

Database.prototype.update = function(id, data, callback) {
  
};

module.exports = Database;


