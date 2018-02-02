var mongoose = require("mongoose");



var UserSchema = new mongoose.Schema({

  firstName: String,
	lastName: String,
  email: String,
  password: String,
  accessKey: Number,
  securityQuestion: String,
  securityAnswer: String,
  files: Array,
  sharedWith: Array,
  sharing: Array
});


const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;

module.exports.getUsers = (callback) => {
	User.find(callback);
}


module.exports.addUser = (user, callback) => {
	User.create(user, callback);
}
