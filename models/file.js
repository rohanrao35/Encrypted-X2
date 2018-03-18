var mongoose = require("mongoose");

var FileSchema = new mongoose.Schema({

  owner: String,
  title: String,
  link: String,
  comments: String,
  dateCreated: Date,
  usersShared: Array,
  timeToDelete: Number,
  timeoutOption: Number
});

const FileModel = mongoose.model('Files', FileSchema);
module.exports = FileModel;

module.exports.getFiles = (callback) => {
	Files.find(callback);
}
/*
module.exports.filesSharedWithMe = (_email, callback) => {
//  var query = { email: _email };
  console.log(query);
	//Files.remove(query, callback);
  Files.find({email: _email});

}

module.exports.filesIShared = (_email, callback) => {
  var query = { email: _email };
  console.log(query);
	Files.remove(query, callback);
}

*/


module.exports.removeFile = (_link, callback) => {
  var query = { link: _link };
  console.log(query);
	Files.remove(query, callback);
}

module.exports.removeFileRequest = (_link, callback) => {

  var query = { link: _link };
  console.log(query);
  Files.remove(query, callback);

}

module.exports.addFile = (file, callback) => {


	Files.create(file, callback);
}
